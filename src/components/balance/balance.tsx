import { getUserTotalSavings } from "~/server/queries";
import { getUserSettings } from "~/server/settings";
import { Card, CardContent, CardHeader, CardTitle } from "../card/card";
import { formatMoney } from "~/shared/lib/utils";
import { useTranslations } from "next-intl";

export default async function BalanceCard(props: { userId: number }) {
  const settings = await getUserSettings(props.userId);
  const total = await getUserTotalSavings(props.userId);
  const t = useTranslations("web");

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
