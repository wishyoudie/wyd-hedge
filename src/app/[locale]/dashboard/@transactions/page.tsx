// import { getTransactions } from "@/server/transactions";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import { DataTable } from "./data-table";
import MockTable from "./temp";

export default async function TransactionsPage() {
  const messages = await getMessages();

  // const transactions = await getTransactions();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* <DataTable data={transactions} /> */}
      <MockTable />
    </NextIntlClientProvider>
  );
}
