export default function OperationModal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  return <div>{operationId}</div>;
}
