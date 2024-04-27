import { getSessionUser } from "~/shared/utils/getServerSession";
import SettingsModal from "~/components/settings-modal/settings-modal";
import { getUserSettings } from "~/server/settings";

export default async function SettingsModalPortal() {
  const sessionUser = await getSessionUser();
  const userSettings = await getUserSettings(+sessionUser!.id);

  return (
    <SettingsModal defaultValues={userSettings} userId={+sessionUser!.id} />
  );
}
