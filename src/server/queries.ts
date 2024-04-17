import "server-only";

import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import { users } from "./db/schema";

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
