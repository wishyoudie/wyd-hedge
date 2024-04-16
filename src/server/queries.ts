// import "server-only";
"use server";

import { db } from "./db";
import type { TelegramUserData } from "@telegram-auth/server";
import { users } from "./db/schema";

export async function createUserOrUpdate(user: TelegramUserData) {
  await db
    .insert(users)
    .values({
      id: `${user.id}`,
      name: user.first_name,
      image: user.photo_url,
    })
    .onConflictDoUpdate({
      target: `${user.id}`,
      set: {
        name: user.first_name,
        image: user.photo_url,
      },
    });
}
