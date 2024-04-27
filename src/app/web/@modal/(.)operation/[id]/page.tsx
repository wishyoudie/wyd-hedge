import { getDetailedOperation } from "~/server/queries";
import OperationModal from "~/components/operation/operation-modal";
import NewOperationModal from "~/components/operation/new-operation-modal";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { getUserAccounts } from "~/server/accounts";

export default async function OperationModalPortal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  if (operationId === "new") {
    const user = await getSessionUser();
    const accounts = await getUserAccounts(+user!.id);
    return <NewOperationModal userId={+user!.id} accounts={accounts} />;
  }
  const idAsNumber = Number(operationId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid Operation ID");
  }

  const operation = await getDetailedOperation(idAsNumber);

  return <OperationModal operation={operation} />;
}
