import { db } from "./db";
import { categories, transactionOnCategories } from "./db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/app/api/auth/options";

export async function getUserCategories() {
  const { user } = await getServerSession();

  return await db.query.categories.findMany({
    where: (model, { eq }) => eq(model.userId, user.id),
  });
}

export async function createRootCategory(userId: number) {
  return await db
    .insert(categories)
    .values({
      name: "root",
      parentId: null,
      userId: userId,
    })
    .returning();
}

export async function createCategory(data: {
  name: string;
  parentId: number;
  userId: number;
}) {
  return await db.insert(categories).values(data);
}

export async function updateCategory(data: { id: number; name: string }) {
  return await db
    .update(categories)
    .set({
      name: data.name,
    })
    .where(eq(categories.id, data.id));
}

export async function deleteCategory(id: number) {
  // Delete all operations relations with this category
  await db
    .delete(transactionOnCategories)
    .where(eq(transactionOnCategories.categoryId, id));
  // Delete this category
  await db.delete(categories).where(eq(categories.id, id));
  // Delete all children of this category
  const children = await db
    .delete(categories)
    .where(eq(categories.parentId, id))
    .returning({ id: categories.id });
  // For each child delete all operations relations with it
  await Promise.all(
    children.map((child) =>
      db
        .delete(transactionOnCategories)
        .where(eq(transactionOnCategories.categoryId, child.id)),
    ),
  );
}
