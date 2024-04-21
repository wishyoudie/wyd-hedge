import { getDetailedOperation } from "~/server/queries";
import OperationModal from "~/widgets/operation-modal";

export default async function OperationModalPortal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(operationId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid Operation ID");
  }

  const operation = await getDetailedOperation(idAsNumber);

  return <OperationModal operation={operation} />;
}
