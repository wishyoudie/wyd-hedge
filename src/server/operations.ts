import { getSessionUser } from "~/shared/utils/getServerSession";
import { db } from "./db";
import { type Operation, operations, operationOnCategories } from "./db/schema";
import { desc, eq } from "drizzle-orm";

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

export async function changeOperation(data: Operation) {
  await db.update(operations).set(data).where(eq(operations.id, data.id));
}

export async function deleteOperation(operationId: number) {
  await db
    .delete(operationOnCategories)
    .where(eq(operationOnCategories.operationId, operationId));
  await db.delete(operations).where(eq(operations.id, operationId));
}
