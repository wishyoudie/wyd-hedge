import { getUserAccounts } from "@/server/accounts";
import InputValueInner from "./input-value";
import { Suspense } from "react";
import InputValueSkeleton from "./input-value-skeleton";

export default async function InputValue() {
  const accounts = await getUserAccounts();

  return (
    <Suspense fallback={<InputValueSkeleton />}>
      <InputValueInner accounts={accounts} />
    </Suspense>
  );
}
