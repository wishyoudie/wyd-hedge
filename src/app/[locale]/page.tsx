import { redirect } from "@/navigation";
import { getServerSession } from "@/app/api/auth/options";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  }
  return <div>Landing</div>;
}
