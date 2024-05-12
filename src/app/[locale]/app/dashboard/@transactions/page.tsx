import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getTransactions } from "@/server/transactions";
import TableLayout from "./table-layout";

export default async function TransactionsPage() {
  const messages = await getMessages();

  const transactions = await getTransactions();

  return (
    <NextIntlClientProvider messages={messages}>
      <TableLayout data={transactions} />
    </NextIntlClientProvider>
  );
}
