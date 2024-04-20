export default function OperationPage({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  return <div className="h-10 bg-slate-300">{operationId}</div>;
}
