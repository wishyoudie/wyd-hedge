import { getCurrentUser } from "~/server/queries";
import BackButton from "~/shared/ui/back-button";
import Balance from "~/shared/ui/tma/balance";

export default async function HomePage() {
  const user = await getCurrentUser();
  const balance = user?.networth ? +user.networth : 0;

  return (
    <>
      <div className="min-h-screen px-4">
        <Balance value={balance} currency={user?.currency} />
      </div>
      <BackButton hide />
    </>
  );
}
