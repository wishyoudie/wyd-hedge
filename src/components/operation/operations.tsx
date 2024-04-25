import Link from "next/link";
import { getLastUserOperations } from "~/server/queries";
import { Button } from "~/components/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/card/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/dialog/dialog";
import AddOperationForm from "~/features/add-operation-form";
import OperationItem from "./operation-item";

export default async function OperationsCard(props: { userId: number }) {
  const operations = await getLastUserOperations(props.userId);

  return (
    <Card className="w-full md:w-96">
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
          <Dialog>
            <DialogTrigger>
              <Button className="w-full">New</Button>
            </DialogTrigger>
            <DialogContent>
              <AddOperationForm redirect="/web" />
            </DialogContent>
          </Dialog>
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
