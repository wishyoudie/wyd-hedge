import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession as get } from "next-auth";

export async function getServerSession() {
  return await get(authOptions);
}
