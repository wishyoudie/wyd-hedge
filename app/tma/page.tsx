import Link from "next/link";
import { Button } from "~/shared/ui/button";
import WelUser from "./welUser";
import BackButton from "~/shared/ui/back-button";

export default async function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <WelUser />
          <Button variant="outline">
            <Link href="/tma/incomes">Incomes</Link>
          </Button>
        </div>
      </div>
      <BackButton hide />
    </>
  );
}
