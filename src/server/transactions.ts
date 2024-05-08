import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import type { Transaction } from "./db/types";
import { transactionOnCategories, transactions } from "./db/schema";
import { getServerSession } from "@/app/api/auth/options";

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
