import { getSessionUser } from "~/shared/utils/getServerSession";
import SettingsModal from "~/components/settings-modal/settings-modal";
import { getUserSettings } from "~/server/settings";
import { getTranslations } from "next-intl/server";

export default async function SettingsModalPortal() {
  const sessionUser = await getSessionUser();
  const userSettings = await getUserSettings(+sessionUser!.id);
  const t = await getTranslations("web.settings");

  return (
    <SettingsModal
      defaultValues={userSettings}
      userId={+sessionUser!.id}
      buttonText={t("buttonText")}
      currency={t("currency")}
      language={t("language")}
      title={t("long")}
      toastText={t("toastText")}
    />
  );
}
