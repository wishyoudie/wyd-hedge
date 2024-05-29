"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createAccount as _createAccount,
  patchAccount as _patchAccount,
  deleteAccount as _deleteAccount,
} from "./accounts";
import {
  createCategory as _createCategory,
  deleteCategory as _deleteCategory,
  updateCategory as _updateCategory,
} from "./categories";
import {
  createTransaction as _createTransaction,
  addTransactionCategories,
  deleteTransaction as _deleteTransaction,
} from "./transactions";
import { getServerSession } from "@/app/api/auth/options";
import { redirect } from "@/navigation";

export type FormState = {
  message: string | null;
  ok: boolean | null;
};

const transactionSchema = z.object({
  type: z.enum(["expense", "income"]),
  value: z.number(),
  accountId: z.number().positive(),
  name: z.string().optional(),
  categories: z.string(),
  createdAt: z.date().nullable().optional(),
});

const accountSchema = z.object({
  name: z.string(),
  currency: z.string(),
  value: z.number().optional(),
  color: z.string().optional(),
  userId: z.number().optional(),
  id: z.number().optional(),
});

const categorySchema = z.object({
  name: z.string(),
  parentId: z.number(),
});

export async function createTransaction(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  const validation = transactionSchema.safeParse({
    type: formData.get("type"),
    value: Number(formData.get("value")),
    accountId: Number(formData.get("accountId")),
    name: formData.get("name"),
    categories: formData.get("categories"),
    createdAt: formData.get("createdAt"),
  });

  if (validation.success) {
    const data = validation.data;
    try {
      const result = await _createTransaction({
        accountId: data.accountId,
        type: data.type,
        value: data.type === "income" ? data.value : -data.value,
        name: data.name ?? "Transaction",
        createdAt: data.createdAt ?? null,
      });

      const resultTransaction = result[0]!;

      const categories = data.categories.split("_").map(Number);
      await addTransactionCategories(resultTransaction.id, categories);
      revalidatePath("/web");
      return {
        ok: true,
        message: `Added transaction ${resultTransaction.name}`,
      };
    } catch (e) {
      return { ok: false, message: "Couldnt create transaction" };
    }
  } else {
    return { ok: false, message: "Couldnt validate data" };
  }
}

export async function deleteTransaction(formData: FormData) {
  const id = Number(formData.get("id"));

  await _deleteTransaction(id);
  // revalidatePath("/web/operations");
}

export async function createCategory(formData: FormData) {
  const validation = categorySchema.safeParse({
    name: formData.get("name"),
    parentId: Number(formData.get("parentId")),
  });

  if (validation.success) {
    const { user } = await getServerSession();
    const data = { ...validation.data, userId: user.id };

    await _createCategory(data);
    revalidatePath("/app/categories");
  } else {
    throw new Error(validation.error.message);
  }
}

export async function updateCategory(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    id: Number(formData.get("id")),
  };

  await _updateCategory(data);
  revalidatePath("/categories");
}

export async function deleteCategory(formData: FormData) {
  await _deleteCategory(Number(formData.get("id")));
  revalidatePath("/categories");
}

export async function createAccount(formData: FormData) {
  const validation = accountSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    value: Number(formData.get("value")),
    color: formData.get("color"),
  });

  if (validation.success) {
    await _createAccount({
      ...validation.data,
      value: validation.data.value ?? 0,
      color: validation.data.color ?? null,
    });
    revalidatePath("/app/accounts");
    redirect("/app/accounts");
  } else {
    throw new Error(validation.error.message);
  }
}

export async function patchAccount(formData: FormData) {
  const validation = accountSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    value: Number(formData.get("value")),
    color: formData.get("color"),
    id: Number(formData.get("id")),
    userId: Number(formData.get("userId")),
  });

  if (validation.success) {
    await _patchAccount({
      ...validation.data,
      id: validation.data.id!,
      userId: validation.data.userId!,
      value: validation.data.value ?? 0,
      color: validation.data.color ?? null,
    });
    revalidatePath("/app/accounts");
    redirect("/app/accounts");
  } else {
    throw new Error(validation.error.message);
  }
}

export async function deleteAccount(formData: FormData) {
  await _deleteAccount(Number(formData.get("id")));
  revalidatePath("/app/accounts");
}
