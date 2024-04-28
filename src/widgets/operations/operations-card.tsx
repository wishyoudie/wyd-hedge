import { Link } from "~/navigation";
import { getLastUserOperations } from "~/server/queries";
import { Button } from "~/components/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/card/card";
import OperationItem from "../../components/operation/operation-item";

export default async function OperationsCard(props: { userId: number }) {
  const operations = await getLastUserOperations(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Operations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {operations.map((op) => (
            <Link href={`/web/operation/${op.id}`} key={op.id}>
              <OperationItem operation={op} />
            </Link>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <Link href="/web/operation/new">
            <Button className="w-fill">New</Button>
          </Link>
          <Link href="/web/operations">
            <Button className="w-full" variant="outline">
              View All
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}