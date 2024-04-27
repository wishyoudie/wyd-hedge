import { getUserTotalSavings } from "~/server/queries";
import { getUserSettings } from "~/server/settings";
import { Card, CardContent, CardHeader, CardTitle } from "../card/card";
import { formatMoney } from "~/shared/lib/utils";

export default async function BalanceCard(props: { userId: number }) {
  const settings = await getUserSettings(props.userId);
  const total = await getUserTotalSavings(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        {formatMoney(total, settings.currency, settings.locale)}
      </CardContent>
    </Card>
  );
}
