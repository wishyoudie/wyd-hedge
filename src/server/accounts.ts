import "server-only";

import { db } from "./db";
import { desc, eq } from "drizzle-orm";
import { accounts, transactions } from "./db/schema";
import { deleteTransaction } from "./transactions";
import type { Account, AccountWithTransactions } from "./db/types";
import { getServerSession } from "@/app/api/auth/options";

export async function createAccount(account: Omit<Account, "id" | "userId">) {
  const { user } = await getServerSession();
  return await db
    .insert(accounts)
    .values({ ...account, userId: user.id })
    .onConflictDoNothing()
    .returning({ id: accounts.id });
}

export async function increaseAccountValue(accountId: number, value: number) {
  const account = await db.query.accounts.findFirst({
    where: (i, { eq }) => eq(i.id, accountId),
  });

  if (!account) {
    throw new Error("No Account with given id");
  }

  return await db
    .update(accounts)
    .set({ ...account, value: account.value + value })
    .where(eq(accounts.id, accountId))
    .returning();
}

export async function getUserAccounts() {
  const { user } = await getServerSession();
  return await db.query.accounts.findMany({
    where: (m, { eq }) => eq(m.userId, user.id),
  });
}

export async function deleteAccount(accountId: number) {
  const transactions = await db.query.transactions.findMany({
    where: (model, { eq }) => eq(model.accountId, accountId),
  });
  await Promise.all(transactions.map((op) => deleteTransaction(op.id)));
  return await db.delete(accounts).where(eq(accounts.id, accountId));
}

export async function getUserAccountsWithLastTransaction() {
  const { user } = await getServerSession();
  return await db.query.accounts.findMany({
    where: (m, { eq }) => eq(m.userId, user.id),
    with: {
      transactions: {
        orderBy: desc(transactions.createdAt),
      },
    },
  });
}

export function sortAccountsByLastTransaction(
  a: AccountWithTransactions,
  b: AccountWithTransactions,
) {
  const leftTransaction = a.transactions[0];
  const rightTransaction = b.transactions[0];

  if (!leftTransaction && rightTransaction) return 1;
  if (leftTransaction && !rightTransaction) return -1;

  const leftDate = leftTransaction?.createdAt ?? new Date();
  const rightDate = rightTransaction?.createdAt ?? new Date();
  return rightDate.getTime() - leftDate.getTime();
}
