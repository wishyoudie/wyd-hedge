import NewEntityPage from "~/_components/new-entity-page";
import SelectCategories from "./(inputs)/select-categories";
import { Suspense } from "react";
import NewTransactionForm from "./form";
import SelectCategoriesSkeleton from "./(inputs)/select-categories-skeleton";
import InputValue from "./(inputs)/input-value-wrapper";

export default function Page() {
  return (
    <NewEntityPage header="New Transaction">
      <NewTransactionForm>
        <InputValue />
        <Suspense fallback={<SelectCategoriesSkeleton />}>
          <SelectCategories />
        </Suspense>
      </NewTransactionForm>
    </NewEntityPage>
  );
}
