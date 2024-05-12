import { getTransactions } from "@/server/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  return <div>{JSON.stringify(transactions)}</div>;
}
