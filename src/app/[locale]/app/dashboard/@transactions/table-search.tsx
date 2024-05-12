import { Input } from "@/components/ui/input";
import type { Transaction } from "@/server/db/types";
import type { Table } from "@tanstack/react-table";

export default function TableSearch({ table }: { table: Table<Transaction> }) {
  return (
    <Input
      placeholder="Filter name..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("name")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
