import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";
import { type Operation, operations } from "./db/schema";
import { desc } from "drizzle-orm";

export type OperationWithCategories = Operation & {
  operationCategories: {
    category: {
      id: number;
      name: string;
    };
  }[];
};

export async function getOperationsWithCategories(
  userId?: string,
): Promise<OperationWithCategories[]> {
  const id = userId ?? (await getSessionUser())!.id;

  return await db.query.operations.findMany({
    where: (model, { eq }) => eq(model.userId, +id),
    orderBy: desc(operations.createdAt),
    with: {
      operationCategories: {
        columns: {
          operationId: false,
          categoryId: false,
        },
        with: {
          category: {
            columns: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
}
