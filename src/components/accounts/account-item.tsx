import { getRatedValue } from "~/server/currencies";
import type { Account } from "~/server/db/schema";
import { formatMoney } from "~/shared/lib/utils";

export default async function AccountItem(
  props: Account & { user: { currency: string } },
) {
  const ratedValue = await getRatedValue(
    props.currency!,
    props.user.currency,
    props.value,
  );

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
        {formatMoney(ratedValue, props.user.currency)}
      </div>
    </div>
  );
}
