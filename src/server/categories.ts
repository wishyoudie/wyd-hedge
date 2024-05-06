import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";
import { categories, operationOnCategories } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getUserCategories(userId?: string) {
  const id = +(userId ?? (await getSessionUser())!.id);

  return await db.query.categories.findMany({
    where: (model, { eq }) => eq(model.userId, id),
  });
}

export async function insertCategory(data: {
  name: string;
  parentId: number;
  userId: number;
}) {
  return await db.insert(categories).values(data);
}

export async function changeCategory(data: { id: number; name: string }) {
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
    .delete(operationOnCategories)
    .where(eq(operationOnCategories.categoryId, id));
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
        .delete(operationOnCategories)
        .where(eq(operationOnCategories.categoryId, child.id)),
    ),
  );
}
