import "server-only";
import { db } from "./db";
import { settings, type Settings } from "./db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./queries";

export async function getUserSettings(userId?: number) {
  const id = userId ?? (await getCurrentUser())!.id;
  const result = await db.query.settings.findFirst({
    where: (model, { eq }) => eq(model.userId, id),
  });

  return result!;
}

export function getDefaultSettings(): Omit<Settings, "userId"> {
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

export async function updateUserSettings(
  newSettings: Partial<Settings> & { userId: number },
) {
  return await db
    .update(settings)
    .set(newSettings)
    .where(eq(settings.userId, newSettings.userId))
    .returning();
}
