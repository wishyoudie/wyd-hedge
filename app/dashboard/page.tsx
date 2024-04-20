import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "~/server/queries";
import { BentoGrid, BentoGridItem } from "~/shared/ui/bento-grid";
import { Card, CardHeader, CardTitle, CardContent } from "~/shared/ui/card";
import OperationsCard from "~/widgets/operations";

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
      <BentoGridItem colSpan={2}>
        <Card>
          <CardHeader>
            <CardTitle>DB Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>
              <blockquote>
                {JSON.stringify({ ...user, photo_url: "Photo" }, null, " ")}
              </blockquote>
            </pre>
          </CardContent>
        </Card>
      </BentoGridItem>
      {/* <BentoGridItem colSpan={2}> */}
      <OperationsCard userId={user.id} />
      {/* </BentoGridItem> */}
    </BentoGrid>
  );
}
