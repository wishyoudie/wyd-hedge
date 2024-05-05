import { getDetailedOperation } from "~/server/queries";
import OperationModal from "~/components/operation/operation-modal";
import NewOperationModal from "~/components/operation/new-operation-modal";
import { getSessionUser } from "~/shared/utils/getServerSession";
import { getUserAccounts } from "~/server/accounts";
import { getTranslations } from "next-intl/server";
import { getUserCategories } from "~/server/categories";

export default async function OperationModalPortal({
  params: { id: operationId },
}: {
  params: { id: string };
}) {
  const t = await getTranslations("web.operations");

  if (operationId === "new") {
    const user = await getSessionUser();
    const accounts = await getUserAccounts(+user!.id);
    const serverCategories = await getUserCategories();
    const categories = serverCategories
      .filter((cat) => cat.name !== "root")
      .map((cat) => ({
        label: cat.name,
        value: `${cat.id}`,
      }));

    return (
      <NewOperationModal
        userId={+user!.id}
        accounts={accounts}
        categories={categories}
        accountLabel={t("account")}
        buttonText={t("buttonText")}
        expense={t("expense")}
        income={t("income")}
        name={t("name")}
        title={t("modalTitle")}
        toastText={t("toastText")}
        value={t("value")}
      />
    );
  }
  const idAsNumber = Number(operationId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid Operation ID");
  }

  const operation = await getDetailedOperation(idAsNumber);

  return <OperationModal operation={operation} />;
}
