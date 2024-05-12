import type { Transaction } from "@/server/db/types";
import { DataTable } from "./data-table";
import TableHeader from "./table-header";
import { Tabs } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";

export default function TableLayout({ data }: { data: Transaction[] }) {
  return (
    <Tabs defaultValue="week">
      <TableHeader />
      <Card className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div className="flex items-center justify-between px-7">
          <CardHeader className="px-0">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent Transactions from your store.
              </CardDescription>
            </div>
          </CardHeader>
          <Link href="/app/transactions/new">
            <Button>New</Button>
          </Link>
        </div>
        <CardContent>
          <DataTable data={data} />
        </CardContent>
      </Card>
    </Tabs>
  );
}
