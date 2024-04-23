import "server-only";

import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import { type InsertOperation, operations, users } from "./db/schema";
import { desc, eq } from "drizzle-orm";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { getCurrencyRate } from "./currencies";

type SN = string | number;
const sntoint = (v: SN) => (typeof v === "string" ? +v : v);

export async function createUserOrUpdate(user: TelegramUserData) {
  await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
      },
    });
}

export async function getUserById(id: string) {
  const values = await db.select().from(users).where(eq(users.id, +id));
  if (values.length > 0) {
    return values[0];
  } else {
    return undefined;
  }
}

export async function getCurrentUser() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("No session found when accessing current user");
  }
  return await getUserById(sessionUser.id);
}

export async function getLastUserOperations(userId: SN, limit = 3) {
  return await db
    .select({
      id: operations.id,
      value: operations.value,
      currency: operations.currency,
      op_type: operations.op_type,
      name: operations.name,
    })
    .from(operations)
    .where(eq(operations.user_id, sntoint(userId)))
    .orderBy(desc(operations.id))
    .limit(limit);
}

export async function getAllUserOperations(userId: SN) {
  return await db
    .select()
    .from(operations)
    .where(eq(operations.user_id, sntoint(userId)));
}

export async function insertOperation(userId: SN, operation: InsertOperation) {
  const user = await getUserById(`${userId}`);
  if (!user) throw new Error("No User with given id");

  const baseCurrency = operation.currency.toLowerCase();
  const targetCurrency = user.currency.toLowerCase();

  let value = operation.value;

  if (baseCurrency === targetCurrency) {
  } else {
    const rate = await getCurrencyRate(baseCurrency, targetCurrency);
    value = value * rate;
  }
  if (operation.op_type === "expense") {
    value = -value;
  }

  await db.insert(operations).values({
    user_id: sntoint(userId),
    ...operation,
  });

  await db
    .update(users)
    .set({ networth: user.networth + value })
    .where(eq(users.id, user.id));
}

export async function getDetailedOperation(operationId: number) {
  const result = await db
    .select()
    .from(operations)
    .where(eq(operations.id, operationId));
  return result.length > 0 ? result[0] : undefined;
}
