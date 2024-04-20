import NewOperationModal from "~/widgets/new-operation-modal";
import OperationModal from "~/widgets/operation-modal";

export default function OperationModalPortal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  if (operationId === "new") {
    return <NewOperationModal />;
  }
  const idAsNumber = Number(operationId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid Operation ID");
  }

  return <OperationModal operationId={idAsNumber} />;
}
