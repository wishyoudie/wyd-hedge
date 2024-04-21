import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession as get } from "next-auth";

export async function getSessionUser() {
  const session = await get(authOptions);
  if (session) {
    return session.user;
  } else {
    return null;
  }
}
