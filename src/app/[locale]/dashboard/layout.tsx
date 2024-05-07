import Nav from "@/components/nav/topnav";
import Footer from "./footer";
import AppCommandDialog from "@/widgets/command/command";

export default function WebLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <main className="flex-1 border-b">{props.children}</main>
      {props.modal}
      <AppCommandDialog />
      <Footer />
    </div>
  );
}
