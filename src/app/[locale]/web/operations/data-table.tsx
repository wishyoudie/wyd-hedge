"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "~/components/badge/badge";
import { Button } from "~/components/button/button";
import { SubmitButton } from "~/components/button/submit-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/dialog/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu/dropdown-menu";
import TagIcon from "~/components/icons/tag";
import { Input } from "~/components/input/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table/table";
import { deleteOperation } from "~/server/actions";
import type { Account, Operation } from "~/server/db/schema";
import type { OperationWithCategories } from "~/server/operations";

interface DataTableProps {
  data: OperationWithCategories[];
  accounts: Account[];
}

export function DataTable({ data, accounts }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dialogData, setDialogData] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const formatter = useFormatter();
  const t = useTranslations("web.operations");

  const handleCopyClick = (operation: Operation) => () => {
    navigator.clipboard
      .writeText(JSON.stringify(operation))
      .then(() => {
        toast("Success", {
          description: `Copied info about ${operation.name}`,
        });
      })
      .catch(() => {
        toast("Something went wrong");
      });
  };

  const handleDeleteSubmit = () => {
    setDialogOpen(false);
    toast("Success", { description: "Operation Deleted" });
  };

  const columns: ColumnDef<OperationWithCategories>[] = useMemo(
    () => [
      {
        accessorKey: "type",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("type")}
          </Button>
        ),
        cell: ({ row }) => {
          const isExpense = row.getValue("type") === "expense";

          return (
            <Badge variant={isExpense ? "default" : "outline"}>
              {isExpense ? "Expense" : "Income"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "name",
        header: t("name"),
      },
      {
        accessorKey: "value",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("value")}
          </Button>
        ),
        cell: ({ row }) => {
          const value = parseFloat(row.getValue("value"));
          const account = accounts.find(
            (ac) => ac.id === row.getValue("accountId"),
          );
          const formatted = formatter.number(value, {
            style: "currency",
            currency: account!.currency!,
          });

          return <span className="text-right font-medium">{formatted}</span>;
        },
      },
      {
        accessorKey: "operationCategories",
        header: "Categories",
        cell: ({ row }) => {
          const operationCategories: {
            category: { id: number; name: string };
          }[] = row.getValue("operationCategories");
          const categories = operationCategories.map((oc) => oc.category);

          if (categories.length === 1 && categories[0]!.name === "root") {
            return <Badge variant="secondary">Unsorted</Badge>;
          }

          return (
            <div className="flex max-w-40 flex-wrap gap-1">
              {categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  <TagIcon className="mr-1 size-2" />
                  <span>{category.name}</span>
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "accountId",
        header: "Account",
        cell: ({ row }) => {
          const id = Number(row.getValue("accountId"));
          const account = accounts.find((ac) => ac.id === id);
          return (
            <span className="text-right font-medium">{account!.name}</span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
          </Button>
        ),
        cell: ({ row }) => {
          const value = new Date(row.getValue("createdAt"));
          const formatted = formatter.dateTime(value, {
            dateStyle: "long",
            timeStyle: "short",
          });
          return <span>{formatted}</span>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const operation = row.original;

          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-8 p-0">
                    <DotsHorizontalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleCopyClick(operation)}>
                    Copy
                  </DropdownMenuItem>
                  <DialogTrigger>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDialogData(operation.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="pt-2 text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete this
            operation.
          </p>
          <div className="flex justify-end gap-2 ">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <form action={deleteOperation}>
              <input type="hidden" value={dialogData} name="id" />
              <SubmitButton onClick={handleDeleteSubmit}>Continue</SubmitButton>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
