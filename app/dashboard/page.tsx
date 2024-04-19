import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserById, getUserOperations } from "~/server/queries";
import { BentoGrid, BentoGridItem } from "~/shared/ui/bento-grid";
import { Card, CardHeader, CardTitle, CardContent } from "~/shared/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    redirect("/");
  }

  const operations = await getUserOperations(user.id);

  return (
    <BentoGrid>
      <BentoGridItem colSpan={1} rowSpan={2}>
        <Card>
          <CardContent>
            <ul>
              {operations.map((op) => (
                <Link key={op.id} href={`/dashboard/operation/${op.id}`}>
                  <li className="w-full py-2 hover:bg-background/30">
                    {op.op_type === "income" ? "+" : "-"}
                    {op.value}
                  </li>
                </Link>
              ))}
            </ul>
          </CardContent>
        </Card>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
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
      </BentoGridItem>
    </BentoGrid>
  );
}
