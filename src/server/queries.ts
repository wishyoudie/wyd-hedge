import "server-only";

import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import { type InsertOperation, operations, users } from "./db/schema";
import { eq } from "drizzle-orm";

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

export async function getUserOperations(userId: SN, limit = 5) {
  return await db
    .select()
    .from(operations)
    .where(eq(operations.user_id, sntoint(userId)))
    .limit(limit);
}

export async function getAllUserOperations(userId: SN) {
  return await db
    .select()
    .from(operations)
    .where(eq(operations.user_id, sntoint(userId)));
}

export async function insertOperation(userId: SN, operation: InsertOperation) {
  return await db.insert(operations).values({
    user_id: sntoint(userId),
    ...operation,
  });
}

export async function getDetailedOperation(operationId: number) {
  const result = await db
    .select()
    .from(operations)
    .where(eq(operations.id, operationId));
  return result.length > 0 ? result[0] : undefined;
}
