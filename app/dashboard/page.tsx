import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "~/server/queries";
import { BentoGrid, BentoGridItem } from "~/shared/ui/bento-grid";
import { Card, CardHeader, CardTitle, CardContent } from "~/shared/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await getUserById(session.user.id);

  return (
    <BentoGrid>
      <BentoGridItem colSpan={2}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>
      <BentoGridItem colSpan={1}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>

      <BentoGridItem colSpan={2}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>

      <BentoGridItem colSpan={1} rowSpan={2}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
            <CardContent>
              <pre>
                <blockquote>{JSON.stringify(user, null, " ")}</blockquote>
              </pre>
            </CardContent>
          </CardHeader>
        </Card>
      </BentoGridItem>
    </BentoGrid>
  );
}
