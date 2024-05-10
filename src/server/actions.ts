"use server";

import { revalidatePath } from "next/cache";
// import { updateUserSettings } from "./settings";
import { z } from "zod";
// import { insertOperation, insertOperationCategories } from "./queries";
import { deleteAccount as _deleteAccount } from "./accounts";
import {
  createCategory as _createCategory,
  deleteCategory as _deleteCategory,
  updateCategory as _updateCategory,
} from "./categories";
// import { getSessionUser } from "~/shared/utils/getServerSession";
import { deleteTransaction as _deleteTransaction } from "./transactions";
import { getServerSession } from "@/app/api/auth/options";

// const settingsSchema = z.object({
//   currency: z.string().optional(),
// });

// const transactionSchema = z.object({
//   type: z.enum(["expense", "income"]),
//   value: z.number(),
//   accountId: z.number(),
//   name: z.string().optional(),
//   categories: z.string(),
// });

// const accountSchema = z.object({
//   name: z.string(),
//   currency: z.string(),
//   value: z.number().optional(),
//   color: z.string().optional(),
// });

const categorySchema = z.object({
  name: z.string(),
  parentId: z.number(),
});

// export async function changeSettings(userId: number, formData: FormData) {
//   const validation = settingsSchema.safeParse({
//     currency: formData.get("currency"),
//   });

//   if (validation.success) {
//     await updateUserSettings({
//       ...validation.data,
//       userId: userId,
//     });

//     revalidatePath("/web");
//   }
// }

// export async function createTransaction(userId: number, formData: FormData) {
//   const validation = transactionSchema.safeParse({
//     type: formData.get("type"),
//     value: Number(formData.get("value")),
//     accountId: Number(formData.get("accountId")),
//     name: formData.get("name"),
//     categories: formData.get("categories"),
//   });

//   if (validation.success) {
//     const data = {
//       userId,
//       accountId: validation.data.accountId,
//       type: validation.data.type,
//       name: validation.data.name ?? "Unknown",
//       value:
//         validation.data.type === "income"
//           ? validation.data.value
//           : -validation.data.value,
//     };

//     const result = await insertOperation(data);
//     const id = result[0]!.id;
//     const categories = validation.data.categories.split("_").map(Number);
//     await insertOperationCategories(id, categories);
//     revalidatePath("/web");
//   } else {
//     throw new Error(validation.error.message);
//   }
// }

export async function deleteTransaction(formData: FormData) {
  const id = Number(formData.get("id"));

  await _deleteTransaction(id);
  // revalidatePath("/web/operations");
}

// export async function createAccount(
//   userId: number,
//   locale: string,
//   formData: FormData,
// ) {
//   const validation = accountSchema.safeParse({
//     name: formData.get("name"),
//     currency: formData.get("currency"),
//     value: Number(formData.get("value")),
//     color: formData.get("color"),
//   });

//   if (validation.success) {
//     const data = { ...validation.data, userId };

//     await insertAccount(data, locale);
//     revalidatePath("/web");
//   } else {
//     throw new Error(validation.error.message);
//   }
// }

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

export async function deleteAccount(formData: FormData) {
  await _deleteAccount(Number(formData.get("id")));
  revalidatePath("/app/accounts");
}
