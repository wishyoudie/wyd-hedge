import Link from "next/link";
import WalletIcon from "../icons/wallet";

export default function TMANavbar() {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-background/90">
      <nav className="flex items-center justify-evenly">
        <Link href="/tma">Home</Link>
        <Link href="/tma/operations">
          <div className="flex flex-col items-center">
            <WalletIcon />
            <span>Operations</span>
          </div>
        </Link>
        <Link href="/tma/profile">Profile</Link>
      </nav>
    </footer>
  );
}
