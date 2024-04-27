"use server";

import { revalidatePath } from "next/cache";
import { updateUserSettings } from "./settings";
import { z } from "zod";
import { insertOperation } from "./queries";

const settingsSchema = z.object({
  locale: z.string(),
  currency: z.string(),
});

const operationSchema = z.object({
  type: z.enum(["expense", "income"]),
  value: z.number(),
  accountId: z.number(),
  name: z.string().nullable(),
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

export async function createOperation(userId: number, formData: FormData) {
  const validation = operationSchema.safeParse({
    type: formData.get("type"),
    value: Number(formData.get("value")),
    accountId: Number(formData.get("accountId")),
    name: formData.get("name"),
  });

  if (validation.success) {
    const data = {
      ...validation.data,
      userId,
      name: validation.data.name ?? "Unknown",
      value:
        validation.data.type === "income"
          ? validation.data.value
          : -validation.data.value,
    };
    await insertOperation(data);
    revalidatePath("/web");
  } else {
    throw new Error(validation.error.message);
  }
}
