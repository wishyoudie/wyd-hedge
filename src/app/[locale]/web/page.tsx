import { redirect } from "next/navigation";
import { BentoGrid, BentoGridItem } from "~/components/bento-grid/bento-grid";

import OperationsCard from "~/widgets/operations/operations-card";
import BalanceCard from "~/components/balance/balance";
import { Card, CardContent, CardHeader } from "~/components/card/card";
import AccountsCard from "~/components/accounts/accounts-card";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { useTranslations } from "next-intl";

function DummyCard() {
  const t = useTranslations("web");
  return (
    <Card>
      <CardHeader>{t("dummy")}</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/");

  return (
    <BentoGrid>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BalanceCard userId={+user.id} />
      </BentoGridItem>
      <BentoGridItem>
        <OperationsCard userId={+user.id} />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <AccountsCard userId={+user.id} />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
    </BentoGrid>
  );
}
