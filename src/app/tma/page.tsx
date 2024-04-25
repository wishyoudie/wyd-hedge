import { getCurrentUser } from "~/server/queries";
import BackButton from "~/components/back-button/back-button";
import Balance from "~/components/balance/balance";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();
  const balance = user?.networth ? +user.networth : 0;

  return (
    <>
      <div className="min-h-screen px-4">
        <Balance
          value={balance}
          currency={user?.currency}
          locale={user?.locale}
        />
      </div>
      <BackButton hide />
    </>
  );
}
