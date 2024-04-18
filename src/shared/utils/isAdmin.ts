import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { env } from "~/env";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return env.ADMIN_IDS.includes(session.user.id);
  }
  return false;
}
