export default function OperationPage({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  return <div>{operationId}</div>;
}
