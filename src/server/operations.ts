import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";

export async function getOperationsWithCategories(userId?: string) {
  const id = userId ?? (await getSessionUser())!.id;

  return await db.query.operations.findMany({
    where: (model, { eq }) => eq(model.userId, +id),
    with: {
      operationCategories: true,
    },
  });
}
