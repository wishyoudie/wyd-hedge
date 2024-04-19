import type { Operation } from "~/server/db/schema";

type Props = {
  operations: Operation[];
};

export default function OperationsList({ operations }: Props) {
  return (
    <ul>
      {operations.map((op) => (
        <li key={op.id}>
          {op.op_type === "income" ? "+" : "-"}
          {op.value}
        </li>
      ))}
    </ul>
  );
}
