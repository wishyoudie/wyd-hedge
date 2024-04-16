import "server-only";
import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import { users } from "./db/schema";

export async function getPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return posts;
}

export async function createUserOrUpdate(user: TelegramUserData) {
  await db.insert(users).values({
    ...user,
    tg_id: user.id,
  });
}

export async function getMe(id: number) {
  const me = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.tg_id, id),
  });

  return me;
}
