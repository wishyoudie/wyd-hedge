import "server-only";

import { db } from "./db";
import { createHash, randomBytes } from "crypto";
import { users } from "./db/schema";

export function generatePasswordHash(password: string) {
  return createHash("md5").update(password).digest("hex");
}

export function generateRandomString() {
  const buf = randomBytes(20);

  return buf.toString("hex");
}

export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (m, { eq }) => eq(m.username, username),
  });
}

export async function createUser({
  username,
  password,
}: {
  username?: string;
  password?: string;
}) {
  return await db
    .insert(users)
    .values({
      password: generatePasswordHash(password ?? generateRandomString()),
      username: username,
    })
    .returning();
}
