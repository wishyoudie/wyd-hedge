import { Button } from "~/shared/ui/button";
import WelUser from "./welUser";
import BackButton from "~/shared/ui/back-button";
import QrScanner from "./qr";
import AddOperationForm from "./_components/add-operation-form";

export default async function HomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <WelUser />
          <div className="container flex flex-wrap gap-2">
            <QrScanner />
            <Button variant="outline">Hide sensitive</Button>
          </div>
        </div>
        <AddOperationForm />
      </div>
      <BackButton hide />
    </>
  );
}
