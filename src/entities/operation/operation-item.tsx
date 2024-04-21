import type { Operation } from "~/server/db/schema";
import { cn, formatDate } from "~/shared/lib/utils";
import WalletIcon from "~/shared/ui/icons/wallet";

type OperationItemProps = {
  operation: Partial<Operation>;
  className?: string;
};

export default function OperationItem(props: OperationItemProps) {
  const { value, op_type: type, createdAt, name } = props.operation;

  return (
    <div
      className={cn(
        "my-2 grid gap-2 rounded-lg border p-4 shadow-sm hover:bg-accent",
        props.className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h6 className="font-semibold">{name}</h6>
          </div>
          <div className="flex items-center gap-2">
            {createdAt && (
              <span className="text-sm">{formatDate(createdAt)}</span>
            )}
          </div>
        </div>
        <div>
          <span
            className={`text-2xl font-semibold ${type === "income" ? "text-green-500" : "text-red-500"}`}
          >
            ${value}
          </span>
        </div>
      </div>
    </div>
  );
}
