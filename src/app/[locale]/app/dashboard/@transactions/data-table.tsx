import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/server/db/types";
import { getFormatter, getTranslations } from "next-intl/server";

type DataEntry = Omit<Transaction, "accountId" | "userId"> & {
  account: { currency: string | null };
};
interface DataTableProps {
  data: DataEntry[];
}

export default async function DataTable({ data }: DataTableProps) {
  const formatter = await getFormatter();
  const t = await getTranslations("web.operations");

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead className="hidden text-center sm:table-cell">
              {t("type")}
            </TableHead>
            <TableHead className="hidden text-center md:table-cell">
              {t("buttonText")}
            </TableHead>
            <TableHead className="text-right">{t("value")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell className="hidden text-center sm:table-cell">
                  <Badge
                    variant={row.type === "expense" ? "default" : "outline"}
                  >
                    {row.type === "expense" ? "Expense" : "Income"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-center sm:table-cell">
                  {formatter.dateTime(row.createdAt!, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatter.number(row.value, {
                    style: "currency",
                    currency: row.account.currency!,
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-20 text-center">
                {t("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
