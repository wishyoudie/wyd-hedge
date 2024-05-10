import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ColorCircle from "@/components/ui/color-circle";
import { Link } from "@/navigation";
import type { AccountWithTransactions } from "@/server/db/types";
import { getFormatter } from "next-intl/server";
import AccountDropdown from "./account-card-dropdown";

export default async function AccountCard({
  account,
}: {
  account: AccountWithTransactions;
}) {
  const formatter = await getFormatter();
  const transaction = account.transactions[0];

  return (
    <Card className="transition-colors hover:border-primary">
      <CardHeader className="flex flex-row items-center pb-0 pt-4">
        <span className="flex items-center gap-2">
          {account.color && <ColorCircle color={account.color} size={20} />}
          <CardTitle>{account.name}</CardTitle>
        </span>
        <AccountDropdown accountId={account.id} />
      </CardHeader>
      <CardContent>
        <div
          className={`py-4 text-xl font-semibold tracking-tight ${account.value < 0 && "text-muted-foreground"}`}
        >
          {formatter.number(account.value, {
            style: "currency",
            currency: account.currency!,
            currencyDisplay: "symbol",
          })}
        </div>
        {transaction ? (
          <>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              {transaction.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatter.relativeTime(transaction.createdAt!)}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No transactions yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
