import Nav from "~/components/nav/topnav";
import Footer from "./footer";

export default function WebLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 border-b">{props.children}</main>
      {props.modal}
      <div id="modal-root" />
      <Footer />
    </>
  );
}
