import Modal from "./modal";

export default function OperationModal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <div>{operationId}</div>
    </Modal>
  );
}
