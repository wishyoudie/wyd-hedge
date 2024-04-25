import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "~/server/queries";
import { BentoGrid, BentoGridItem } from "~/components/bento-grid/bento-grid";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "~/components/card/card";
import OperationsCard from "~/components/operation/operations";

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
      <OperationsCard userId={user.id} />
    </BentoGrid>
  );
}
