// import OperationsCard from "@/widgets/operations/operations-card";
// import AccountsCard from "@/widgets/accounts/accounts-card";
// import { getServerSession } from "@/shared/utils/getServerSession";
import OperationsByDayChart from "@/widgets/charts/operation-by-day";
import { Button } from "@/components/ui/button";
// import LoggedOffWidget from "@/widgets/logged-off/logged-off";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
  // const user = await getServerSession();

  // if (!user) {
  //   return <LoggedOffWidget />; // Сhange to another widget with call to sign in
  // }

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
      <Tabs defaultValue="accounts" className="space-y-4">
        <div className="flex justify-between">
          <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          <Button>Add Operation</Button>
        </div>
        <TabsContent value="accounts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 2xl:grid-cols-12">
            <OperationsByDayChart className="col-span-4" />
            {/* <AccountsCard userId={+user.id} className="col-span-3" /> */}
          </div>
        </TabsContent>
        <TabsContent value="operations">
          {/* <OperationsCard userId={+user.id} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
