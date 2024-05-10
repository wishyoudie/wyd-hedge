import { Button } from "@/components/ui/button";
import NewEntityPage from "~/_components/new-entity-page";

export default function EditAccountPage({
  params: { id: accountId },
}: {
  params: { id: string };
}) {
  return (
    <NewEntityPage header="New Account">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8"></div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8"></div>
      </div>
      <Button size="lg">{accountId}</Button>
    </NewEntityPage>
  );
}
