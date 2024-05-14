import { getTransactions } from "@/server/transactions";
import { DataTable } from "./data-table";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <DataTable data={transactions} />
    </NextIntlClientProvider>
  );
}
