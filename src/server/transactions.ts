import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import type { Transaction } from "./db/types";
import { transactionOnCategories, transactions } from "./db/schema";
import { getServerSession } from "@/app/api/auth/options";
import { MONTH_MS, WEEK_MS } from "@/shared/const";

export type TransactionWithCategories = Transaction & {
  categories: {
    category: {
      id: number;
      name: string;
    };
  }[];
};

// export async function getTransactionsWithCategories(
//   userId?: string,
// ): Promise<TransactionWithCategories[]> {
//   const id = userId ?? (await getSessionUser())!.id;

//   return await db.query.transactions.findMany({
//     where: (model, { eq }) => eq(model.userId, +id),
//     orderBy: desc(transactions.createdAt),
//     with: {
//       categories: {
//         columns: {
//           transactionId: false,
//           categoryId: false,
//         },
//         with: {
//           category: {
//             columns: {
//               name: true,
//               id: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }

export async function createTransaction(
  data: Omit<Transaction, "id" | "userId">,
) {
  const { user } = await getServerSession();
  return await db
    .insert(transactions)
    .values({
      userId: user.id,
      name: data.name,
      type: data.type,
      value: data.value,
      accountId: data.accountId,
      createdAt: data.createdAt ?? undefined,
    })
    .returning();
}

export async function addTransactionCategories(
  transactionId: number,
  categoriesIds: number[],
) {
  await Promise.all(
    categoriesIds.map((categoryId) =>
      db.insert(transactionOnCategories).values({ transactionId, categoryId }),
    ),
  );
}

export async function changeTransaction(data: Transaction) {
  await db.update(transactions).set(data).where(eq(transactions.id, data.id));
}

export async function deleteTransaction(transactionId: number) {
  await db
    .delete(transactionOnCategories)
    .where(eq(transactionOnCategories.transactionId, transactionId));
  await db.delete(transactions).where(eq(transactions.id, transactionId));
}

export async function getTransactions() {
  const { user } = await getServerSession();

  return await db.query.transactions.findMany({
    where: (m, { eq }) => eq(m.userId, user.id),
  });
}

export async function getRecentTransactionsWithCurrency(
  timespan: "week" | "month",
) {
  const { user } = await getServerSession();
  const now = new Date();
  const lowerBound = new Date(
    timespan === "week" ? now.getTime() - WEEK_MS : MONTH_MS,
  );

  return await db.query.transactions.findMany({
    columns: {
      accountId: false,
      userId: false,
    },
    where: (m, { eq, gte }) =>
      eq(m.userId, user.id) && gte(m.createdAt, lowerBound),
    orderBy: desc(transactions.createdAt),
    with: {
      account: {
        columns: {
          currency: true,
        },
      },
    },
  });
}
