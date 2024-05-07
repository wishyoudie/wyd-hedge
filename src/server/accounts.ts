import "server-only";
import { db } from "./db";
import { accounts } from "./db/schema";
import { eq } from "drizzle-orm";
import { deleteTransaction } from "./transactions";
import type { Account } from "./db/types";

function getDefaultAccountName(locale: string) {
  return locale === "ru" ? "Счет" : "Account";
}

export async function insertAccount(
  account: Omit<Account, "id">,
  locale = "ru",
) {
  const settings = await getUserSettings(account.userId);

  const currency = account.currency ?? settings.currency;

  const value = account.value ?? 0;
  const name = account.name ?? getDefaultAccountName(locale);

  return await db
    .insert(accounts)
    .values({ ...account, currency, value, name })
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

export async function getUserAccounts(userId: number) {
  return await db.select().from(accounts).where(eq(accounts.userId, userId));
}

export async function deleteAccount(accountId: number) {
  const Transactions = await db.query.transactions.findMany({
    where: (model, { eq }) => eq(model.accountId, accountId),
  });
  await Promise.all(Transactions.map((op) => deleteTransaction(op.id)));
  return await db.delete(accounts).where(eq(accounts.id, accountId));
}
