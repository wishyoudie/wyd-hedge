"use server";

import { revalidatePath } from "next/cache";
import { updateUserSettings } from "./settings";
import { z } from "zod";

const settingsSchema = z.object({
  locale: z.string(),
  currency: z.string(),
});

export async function changeSettings(userId: number, formData: FormData) {
  const validation = settingsSchema.safeParse({
    locale: formData.get("locale"),
    currency: formData.get("currency"),
  });

  if (validation.success) {
    await updateUserSettings({
      ...validation.data,
      userId: userId,
    });

    revalidatePath("/web");
  }
}
