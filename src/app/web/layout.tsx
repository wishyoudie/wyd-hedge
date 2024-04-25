import Nav from "~/components/nav/topnav";
import Footer from "./footer";

export default function WebLayout(props: {
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
