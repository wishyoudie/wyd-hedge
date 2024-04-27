import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "~/server/queries";
import { BentoGrid, BentoGridItem } from "~/components/bento-grid/bento-grid";

import OperationsCard from "~/components/operation/operations";
import BalanceCard from "~/components/balance/balance";
import { Card, CardContent, CardHeader } from "~/components/card/card";

function DummyCard() {
  return (
    <Card>
      <CardHeader>Dummy</CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/");
  }

  return (
    <BentoGrid>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <BalanceCard userId={user.id} />
      </BentoGridItem>
      <BentoGridItem>
        <OperationsCard userId={user.id} />
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
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <DummyCard />
      </BentoGridItem>
    </BentoGrid>
  );
}
