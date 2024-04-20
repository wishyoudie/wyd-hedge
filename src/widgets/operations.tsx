import type { ReactElement } from "react";
import Link from "next/link";
import type { Operation } from "~/server/db/schema";
import { getUserOperations } from "~/server/queries";
import { formatDate } from "~/shared/lib/utils";
import { Button } from "~/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/shared/ui/card";
import WalletIcon from "~/shared/ui/icons/wallet";

type OperationItemProps = {
  operation: Operation;
};

type OperationListProps = {
  children?: ReactElement<OperationItemProps>[];
};

function OperationList(props: OperationListProps) {
  return <ul>{props.children}</ul>;
}

function OperationItem(props: OperationItemProps) {
  const { id, value, op_type: type, createdAt, name } = props.operation;

  return (
    <Link
      href={`/dashboard/operation/${id}`}
      className="my-2 grid gap-2 rounded-lg border p-4 shadow-sm hover:bg-accent"
    >
      <div className="flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h6 className="font-semibold">{name}</h6>
          </div>
          <div className="flex items-center gap-2">
            {createdAt && (
              <span className="text-sm">{formatDate(createdAt)}</span>
            )}
          </div>
        </div>
        <div>
          <span
            className={`text-2xl font-semibold ${type === "income" ? "text-green-500" : "text-red-500"}`}
          >
            ${value}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function OperationsCard(props: { userId: number }) {
  const operations = await getUserOperations(props.userId);

  return (
    <Card className="w-full md:w-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Operations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OperationList>
          {operations.map((op) => (
            <OperationItem key={op.id} operation={op} />
          ))}
        </OperationList>
        <div className="mt-4 flex flex-col gap-2">
          <Link href="/dashboard/operation/new">
            <Button className="w-full">New</Button>
          </Link>
          <Link href="/operations">
            <Button className="w-full" variant="outline">
              View All
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
