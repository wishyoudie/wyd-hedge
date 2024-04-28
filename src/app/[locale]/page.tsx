import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import HomeNav from "../../components/nav/home-nav";
import LoggedOffWidget from "~/components/logged-off/logged-off";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <>
        <HomeNav />
        <main className="flex-1">
          <div className="container relative">
            <LoggedOffWidget />
          </div>
        </main>
      </>
    );
  }

  redirect("/web");
}
