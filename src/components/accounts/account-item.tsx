import type { Account } from "~/server/db/schema";
import { formatMoney } from "~/shared/lib/utils";

export default function AccountItem(
  props: Account & { user: { locale: string; currency: string } },
) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-4 py-3"
      style={{ backgroundColor: props.color ?? "hsl(var(--accent))" }}
    >
      <div>
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {props.name}
        </h3>
        {props.currency !== props.user.currency && (
          <span className="text-sm font-medium leading-none">
            {formatMoney(props.value, props.currency!)}
          </span>
        )}
      </div>
      <div className="leading-loose">
        {formatMoney(props.value, props.user.currency)}
      </div>
    </div>
  );
}
