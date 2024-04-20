import { getDetailedOperation } from "~/server/queries";
import Modal from "~/shared/ui/modal";

export default async function OperationModal(props: { operationId: number }) {
  const operation = await getDetailedOperation(props.operationId);

  return (
    <Modal>
      <pre>
        <blockquote>{JSON.stringify(operation, null, " ")}</blockquote>
      </pre>
    </Modal>
  );
}
