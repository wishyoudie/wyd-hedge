import { getServerSession } from "@/shared/utils/getServerSession";
import { redirect } from "@/navigation";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  }
  return <div>Landing</div>;
}
