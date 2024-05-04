import { getSessionUser } from "~/shared/utils/getServerSession";
import { DataTable } from "./data-table";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getUserAccounts } from "~/server/accounts";
import { getOperationsWithCategories } from "~/server/operations";

export default async function OperationsPage() {
  const messages = await getMessages();

  const user = await getSessionUser();
  const operations = await getOperationsWithCategories(user!.id);
  const accounts = await getUserAccounts(+user!.id);

  return (
    <div className="container mx-auto py-10">
      <NextIntlClientProvider messages={messages}>
        <DataTable data={operations} accounts={accounts} />
      </NextIntlClientProvider>
    </div>
  );
}
