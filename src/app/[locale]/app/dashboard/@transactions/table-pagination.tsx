import { Button } from "@/components/ui/button";
import type { Transaction } from "@/server/db/types";
import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function TablePagination({
  table,
}: {
  table: Table<Transaction>;
}) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="size-3" />
        <span>Previous</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span>Next</span>
        <ChevronRightIcon className="size-3" />
      </Button>
    </div>
  );
}
