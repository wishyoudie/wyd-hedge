import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader, CardTitle } from "~/shared/ui/card";
import LoggedOffCard from "~/widgets/logged-off";
import { env } from "~/env";
import Nav from "./_components/navigation/topnav";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <Nav />
        <main>
          <div className="flex w-full justify-center pt-44">
            <LoggedOffCard miniAppLink={env.MINI_APP_URL} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="flex h-full w-full place-content-center ">
        <Card>
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>
                  {JSON.stringify(session.user, null, " ")}
                </blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </main>
    </>
  );
}
