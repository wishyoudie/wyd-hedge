// import { getServerSession } from "@/shared/utils/getServerSession";
// import { redirect } from "next/navigation";

// export default async function RootPage() {
//   const session = await getServerSession();
//   console.log("session: ", session);
//   if (session?.user) {
//     redirect("/dashboard");
//   }

//   return <div>Landing</div>;
// }

import { type Locale } from "@/i18n";

import { getServerSession } from "next-auth";

import AuthButton from "@/components/auth-button";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getDictionary } from "@/shared/lib/dictionaries";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OperationsByDayChart from "@/widgets/charts/operation-by-day";
import Link from "next/link";
// import { Link } from "@/navigation";

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { web } = await getDictionary(locale);
  const session = await getServerSession(authOptions);
  const user = session?.user;

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
          <Link href="/dashboard">
            <Button>Add Operation</Button>
          </Link>
        </div>
        <TabsContent value="accounts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 2xl:grid-cols-12">
            <OperationsByDayChart className="col-span-4" />
            <section className="py-24">
              <div className="container">
                <h1 className="text-3xl font-bold">{web.navbar.dashboard}</h1>
                <p className="text-gray-500">{web.footerText}</p>

                <div className="mt-6">
                  <pre className="mt-4">
                    <code>{JSON.stringify({ name: user?.name }, null, 2)}</code>
                  </pre>

                  <AuthButton />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
        <TabsContent value="operations">
          {/* <OperationsCard userId={+user.id} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
