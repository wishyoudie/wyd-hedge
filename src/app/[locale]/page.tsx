import { redirect } from "next/navigation";
import HomeNav from "../../components/nav/home-nav";
import LoggedOffWidget from "~/widgets/logged-off/logged-off";
import { getSessionUser } from "~/shared/utils/getServerSession";

export default async function HomePage() {
  const user = await getSessionUser();

  if (!user) {
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
