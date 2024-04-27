"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Operation } from "~/server/db/schema";

export const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];
