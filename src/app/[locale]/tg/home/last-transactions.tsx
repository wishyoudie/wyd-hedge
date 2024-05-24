import { Icon28AddCircle } from "@/components/icons/add-circle";
import { getRecentTransactionsWithCurrency } from "@/server/transactions";
import { Cell, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { Suspense } from "react";

async function LastUserTransactions() {
  const transactions = await getRecentTransactionsWithCurrency("week");

  return (
    <Section header="Recent Transactions">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <Cell key={transaction.id}>{transaction.name}</Cell>
        ))
      ) : (
        // <Cell>
        <div>
          <Placeholder description="No data">
            <Icon28AddCircle />
          </Placeholder>
        </div>
        // </Cell>
      )}
    </Section>
  );
}

export default function LastUserTransactionsSection() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <LastUserTransactions />
    </Suspense>
  );
}
