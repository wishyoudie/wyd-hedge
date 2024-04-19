import Nav from "app/_components/navigation/topnav";
import Footer from "./footer";

export default function DashboardLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="border-b">{props.children}</div>
      </main>
      {props.modal}
      <div id="modal-root" />
      <Footer />
    </>
  );
}
