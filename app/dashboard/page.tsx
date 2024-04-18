import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BentoGrid, BentoGridItem } from "~/shared/ui/bento-grid";
import { Card, CardHeader, CardTitle, CardContent } from "~/shared/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const data = { id: session.user.id, name: session.user.name };

  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      <BentoGridItem
        className="md:col-span-2"
        header={
          <Card>
            <CardHeader>
              <CardTitle>Session Data</CardTitle>
              <CardContent>
                <pre>
                  <blockquote>{JSON.stringify(data, null, " ")}</blockquote>
                </pre>
              </CardContent>
            </CardHeader>
          </Card>
        }
      />
      <BentoGridItem
        className="md:col-span-1"
        header={
          <Card>
            <CardHeader>
              <CardTitle>Session Data</CardTitle>
              <CardContent>
                <pre>
                  <blockquote>{JSON.stringify(data, null, " ")}</blockquote>
                </pre>
              </CardContent>
            </CardHeader>
          </Card>
        }
      />
      <BentoGridItem
        header={
          <Card>
            <CardHeader>
              <CardTitle>Session Data</CardTitle>
              <CardContent>
                <pre>
                  <blockquote>{JSON.stringify(data, null, " ")}</blockquote>
                </pre>
              </CardContent>
            </CardHeader>
          </Card>
        }
      />
    </BentoGrid>
  );
}
