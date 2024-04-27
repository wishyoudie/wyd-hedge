import "server-only";
import { db } from "./db";
import { settings, type Settings } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getUserSettings(userId: number) {
  const result = await db.query.settings.findFirst({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  return result!;
}

export function getDefaultSettings(): Omit<Settings, "userId" | "theme"> {
  return {
    currency: "rub",
    locale: "ru",
  };
}

type SettingsKey = keyof Omit<Settings, "userId">;

export async function updateUserSetting(
  key: SettingsKey,
  value: string | number,
  userId: number,
) {
  return await db
    .update(settings)
    .set({ [key]: value })
    .where(eq(settings.userId, userId))
    .returning();
}

export async function updateUserSettings(newSettings: Settings) {
  return await db
    .update(settings)
    .set(newSettings)
    .where(eq(settings.userId, newSettings.userId))
    .returning();
}
