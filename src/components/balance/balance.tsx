import { getUserTotalSavings } from "~/server/queries";
import { getUserSettings } from "~/server/settings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatMoney } from "~/shared/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function BalanceCard(props: { userId: number }) {
  const settings = await getUserSettings(props.userId);
  const total = await getUserTotalSavings(props.userId);
  const t = await getTranslations("web");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("balance")}</CardTitle>
      </CardHeader>
      <CardContent>
        {formatMoney(total, settings.currency, settings.locale)}
      </CardContent>
    </Card>
  );
}
