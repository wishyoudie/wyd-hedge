import BackButton from "~/shared/ui/back-button";
import Balance from "~/shared/ui/tma/balance";

export default async function HomePage() {
  return (
    <>
      <div className="min-h-screen">
        <div className="px-4">
          <Balance value={12390} />
        </div>
      </div>
      <BackButton hide />
    </>
  );
}
