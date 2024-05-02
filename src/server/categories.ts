import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";
import { categories } from "./db/schema";

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
