import "server-only";

import { db } from "./db";
import { users } from "./db/schema";
import { createRootCategory } from "./categories";
import { getServerSession } from "@/app/api/auth/options";
import { decrypt, encrypt } from "./encryption";
import { eq } from "drizzle-orm";

export async function getUserById(id?: number) {
  const userId = id ?? (await getServerSession()).user.id;
  return await db.query.users.findFirst({
    where: (m, { eq }) => eq(m.id, userId),
  });
}

export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (m, { eq }) => eq(m.username, username),
  });
}

export async function getUserByTelegramUsername(username: string) {
  return await db.query.users.findFirst({
    where: (m, { eq }) => eq(m.tgUsername, username),
  });
}

export async function createUser({ username }: { username?: string }) {
  const callDb = await db
    .insert(users)
    .values({
      username: username,
    })
    .returning();

  const returned = callDb[0];

  if (returned) {
    await createRootCategory(returned.id);
    return returned;
  }

  throw new Error("Error creating user");
}

export async function createTelegramUser({ username }: { username?: string }) {
  const callDb = await db
    .insert(users)
    .values({
      username: username,
      tgUsername: username,
    })
    .returning();

  const returned = callDb[0];

  if (returned) {
    await createRootCategory(returned.id);
    return returned;
  }

  throw new Error("Error creating Telegram user");
}

export async function getSyncLink() {
  const user = await getUserById();
  if (user?.tgUsername) {
    return {
      data: user.tgUsername,
      isLink: false,
    };
  }

  return {
    data: await createSyncLink(),
    isLink: true,
  };
}

export async function createSyncLink() {
  const { user } = await getServerSession();

  return encrypt(`${user.id}`);
}

export async function syncUsers(receivedLink: string, username: string) {
  const data = decrypt(receivedLink);

  return await db
    .update(users)
    .set({
      tgUsername: username,
    })
    .where(eq(users.id, +data))
    .returning();
}

export async function getUserTotalBalance() {
  const { user } = await getServerSession();
  const targetCurrency = user.currency;

  return {
    currency: targetCurrency,
    total: 0,
  };
}
