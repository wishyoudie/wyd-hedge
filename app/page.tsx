import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Card, CardContent, CardHeader, CardTitle } from "~/shared/ui/card";
import { getUserById } from "~/server/queries";
import LoggedOffCard from "~/widgets/logged-off";
import { env } from "~/env";
import Link from "next/link";
import Nav from "./_components/navigation/topnav";
// import Nav from "./_components/navigation/topnav";

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

  const user = await getUserById(session.user.id);

  return (
    <>
      <Nav />
      <main>
        <div className="mt-10 flex flex-col items-center">
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
          <Card>
            <CardHeader>
              <Link href="/tma">
                <CardTitle>TMA</CardTitle>
              </Link>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>DB Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
