import { getUserById } from "~/server/queries";
import { getSessionUser } from "~/shared/utils/getServerSession";
import SettingsModal from "~/widgets/settings-modal";

export default async function SettingsModalPortal() {
  const sessionUser = await getSessionUser();
  const user = await getUserById(sessionUser!.id);

  return <SettingsModal user={user} />;
}
