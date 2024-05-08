import { getTransactions } from "@/server/transactions";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { DataTable } from "./data-table";

export default async function TransactionsPage() {
  const messages = await getMessages();

  const transactions = await getTransactions();

  return (
    <div className="container mx-auto py-10">
      <NextIntlClientProvider messages={messages}>
        <DataTable data={transactions} />
      </NextIntlClientProvider>
    </div>
  );
}
