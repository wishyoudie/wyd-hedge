import type { AccountWithTransactions } from "@/server/db/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ColorCircle from "@/components/ui/color-circle";
import { Link } from "@/navigation";
import { getFormatter } from "next-intl/server";
import AccountDropdown from "../_components/account-card-dropdown";

async function AccountCard({ account }: { account: AccountWithTransactions }) {
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

async function AccountRow({ account }: { account: AccountWithTransactions }) {
  const formatter = await getFormatter();
  const transaction = account.transactions[0];

  return (
    <Card className="grid grid-cols-5 items-center px-4">
      <span className="col-span-1 flex items-center gap-2">
        {account.color && <ColorCircle color={account.color} size={20} />}
        <CardTitle>{account.name}</CardTitle>
      </span>
      <div
        className={`col-span-2 py-4 text-xl font-semibold tracking-tight ${account.value < 0 && "text-muted-foreground"}`}
      >
        {formatter.number(account.value, {
          style: "currency",
          currency: account.currency!,
          currencyDisplay: "symbol",
        })}
      </div>
      {transaction ? (
        <div>
          <Link
            href={`/app/transactions/${transaction.id}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            {transaction.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatter.relativeTime(transaction.createdAt!)}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No transactions yet.</p>
      )}
      <AccountDropdown accountId={account.id} />
    </Card>
  );
}

export default function AccountsList(props: {
  accounts: AccountWithTransactions[];
  display: string;
}) {
  if (props.display === "list") {
    return (
      <div className="grid gap-4 py-4">
        {props.accounts.map((account) => (
          <AccountRow key={account.id} account={account} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
      {props.accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
