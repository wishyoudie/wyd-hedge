import { getAllUserOperations } from "~/server/queries";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { DataTable } from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Operation } from "~/server/db/schema";
import { useTranslations } from "next-intl";

export default async function OperationsPage() {
  const user = await getSessionUser();
  const operations = await getAllUserOperations(user!.id);
  const t = useTranslations("web.operations");

  const columns: ColumnDef<Operation>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "type",
      header: t("type"),
    },
    {
      accessorKey: "value",
      header: t("value"),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={operations} />
    </div>
  );
}
