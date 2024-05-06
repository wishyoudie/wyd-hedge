import "server-only";
import { db } from "./db";
import { type InsertAccount, accounts } from "./db/schema";
import { getUserSettings } from "./settings";
import { eq } from "drizzle-orm";
import { deleteOperation } from "./operations";

function getDefaultAccountName(locale: string) {
  return locale === "ru" ? "Счет" : "Account";
}

export async function insertAccount(account: InsertAccount, locale = "ru") {
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
  const operations = await db.query.operations.findMany({
    where: (model, { eq }) => eq(model.accountId, accountId),
  });
  await Promise.all(operations.map((op) => deleteOperation(op.id)));
  return await db.delete(accounts).where(eq(accounts.id, accountId));
}
