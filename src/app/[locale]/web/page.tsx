import { redirect } from "next/navigation";
import OperationsCard from "~/widgets/operations/operations-card";
import BalanceCard from "~/components/balance/balance";
import AccountsCard from "~/widgets/accounts/accounts-card";
import { getSessionUser } from "~/shared/utils/getServerSession";
import OperationsByDayChart from "~/widgets/charts/operation-by-day";
import { Button } from "~/components/button/button";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/");

  return (
    <div className="space-y-4 p-8 pt-6">
      <header className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="default" disabled>
            Download
          </Button>
        </div>
      </header>
      <BalanceCard userId={+user.id} />
      <OperationsCard userId={+user.id} />
      <AccountsCard userId={+user.id} />
      <OperationsByDayChart />
    </div>
  );
}
