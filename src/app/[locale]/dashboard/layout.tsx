import AppCommandDialog from "@/widgets/command/command";
import Aside from "../_components/aside";
import Header from "../_components/header";

export default function WebLayout(props: {
  children: React.ReactNode;
  transactions: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          {props.children}
          {props.transactions}
        </div>
      </div>
      <AppCommandDialog />
      {/* {props.modal} */}
    </>
  );
}
