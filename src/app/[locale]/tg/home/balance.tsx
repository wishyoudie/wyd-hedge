import ColorCircle from "@/components/ui/color-circle";
import { getUserAccountsWithLastTransaction } from "@/server/accounts";
import { getUserTotalBalance } from "@/server/users";
import { Cell, LargeTitle, Section, Text } from "@telegram-apps/telegram-ui";
import { getFormatter } from "next-intl/server";
import { Suspense } from "react";

async function TotalBalance() {
  const { total, currency } = await getUserTotalBalance();
  const format = await getFormatter();
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Text weight="3">Total Balance</Text>
      <LargeTitle weight="1">
        {format.number(total, {
          style: "currency",
          currency: currency,
          currencyDisplay: "narrowSymbol",
        })}
      </LargeTitle>
    </div>
  );
}

async function Accounts() {
  const accounts = await getUserAccountsWithLastTransaction();
  const format = await getFormatter();

  return (
    <>
      {accounts.map((account) => (
        <Section key={account.id}>
          <Cell
            before={<ColorCircle size={24} color={account.color} />}
            after={format.number(account.value, {
              style: "currency",
              currency: account.currency!,
              currencyDisplay: "narrowSymbol",
            })}
          >
            {account.name}
          </Cell>
        </Section>
      ))}
    </>
  );
}

export default function BalanceSection() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <TotalBalance />
      </Suspense>
      <Suspense fallback={<div>Loading</div>}>
        <Accounts />
      </Suspense>
    </>
  );
}
