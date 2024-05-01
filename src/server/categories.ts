import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";

export async function getUserCategories(userId?: string) {
  const id = +(userId ?? (await getSessionUser())!.id);

  return await db.query.categories.findMany({
    where: (model, { eq }) => eq(model.userId, id),
  });
}
