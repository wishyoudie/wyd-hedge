import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "~/shared/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Data</CardTitle>
        <CardContent>
          <pre>
            <blockquote>{JSON.stringify(session.user, null, " ")}</blockquote>
          </pre>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
