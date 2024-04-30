import { getRatedValue } from "~/server/currencies";
import type { Account } from "~/server/db/schema";
import ColorCircle from "../color-circle/color-circle";
import { getFormatter } from "next-intl/server";

export default async function AccountItem(
  props: Account & { user: { currency: string } },
) {
  const formatter = await getFormatter();
  const ratedValue = await getRatedValue(
    props.currency!,
    props.user.currency,
    props.value,
  );

  return (
    <div className="flex items-center">
      <ColorCircle color={props.color ?? "hsl(var(--accent))"} size={30} />
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{props.name}</p>
        {props.currency !== props.user.currency && (
          <p className="text-sm text-muted-foreground">
            {formatter.number(props.value, {
              style: "currency",
              currency: props.currency!,
            })}
          </p>
        )}
      </div>
      <div className="ml-auto font-medium">
        {formatter.number(ratedValue, {
          style: "currency",
          currency: props.user.currency,
        })}
      </div>
    </div>
  );
}
