import { getDetailedOperation } from "@/server/queries";
import OperationModal from "@/components/operation/operation-modal";
import { getServerSession } from "@/shared/utils/getServerSession";
import { getTranslations } from "next-intl/server";
import NewAccountModal from "@/components/accounts/new-account-modal";

export default async function AccountModalPortal({
  params: { id: accountId },
}: {
  params: { id: string };
}) {
  const t = await getTranslations("web.accounts");

  if (accountId === "new") {
    const user = await getServerSession();

    return (
      // <NewAccountModal
      //   userId={+user!.id}
      //   buttonText={t("buttonShort")}
      //   name={t("name")}
      //   namePlaceholder={t("namePlaceholder")}
      //   valuePlaceholder={t("valuePlaceholder")}
      //   title={t("buttonLong")}
      //   toastText={t("toastText")}
      //   value={t("value")}
      // />
      <></>
    );
  }
  const idAsNumber = Number(accountId);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid Account ID");
  }

  const operation = await getDetailedOperation(idAsNumber);

  return <OperationModal operation={operation} />;
}
