import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import type { Operation } from "~/server/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "~/shared/ui/card";

export default function OperationDetails(props: { operation: Operation }) {
  return (
    <Card className="relative mt-2">
      <CardHeader>
        <CardTitle>{props.operation.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>
          <blockquote>{JSON.stringify(props.operation, null, " ")}</blockquote>
        </pre>
      </CardContent>
      <Link
        href={"/dashboard/operations"}
        className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <Cross2Icon className="h-6 w-6" />
      </Link>
    </Card>
  );
}
