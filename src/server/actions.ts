"use server";

import { revalidatePath } from "next/cache";
import { updateUserSettings } from "./settings";
import { z } from "zod";
import { insertOperation } from "./queries";
import { insertAccount } from "./accounts";
import { insertCategory } from "./categories";

const settingsSchema = z.object({
  currency: z.string().optional(),
});

const operationSchema = z.object({
  type: z.enum(["expense", "income"]),
  value: z.number(),
  accountId: z.number(),
  name: z.string().optional(),
});

const accountSchema = z.object({
  name: z.string(),
  currency: z.string(),
  value: z.number().optional(),
  color: z.string().optional(),
});

const categorySchema = z.object({
  name: z.string(),
  parentId: z.number(),
});

export async function changeSettings(userId: number, formData: FormData) {
  const validation = settingsSchema.safeParse({
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

export async function createAccount(
  userId: number,
  locale: string,
  formData: FormData,
) {
  const validation = accountSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    value: Number(formData.get("value")),
    color: formData.get("color"),
  });

  if (validation.success) {
    const data = { ...validation.data, userId };

    await insertAccount(data, locale);
    revalidatePath("/web");
  } else {
    throw new Error(validation.error.message);
  }
}

export async function createCategory(userId: number, formData: FormData) {
  const validation = categorySchema.safeParse({
    name: formData.get("name"),
    parentId: Number(formData.get("parentId")),
  });

  if (validation.success) {
    const data = { ...validation.data, userId };

    await insertCategory(data);
    revalidatePath("/categories");
  } else {
    throw new Error(validation.error.message);
  }
}
