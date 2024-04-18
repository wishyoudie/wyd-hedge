import type { PropsWithChildren } from "react";
import Nav from "app/_components/navigation/topnav";
import Footer from "./footer";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="border-b">{children}</div>
      </main>
      <Footer />
    </>
  );
}
