import { Separator } from "~/shared/ui/separator";
import ThemeToggle from "~/app/theme/theme-select";
import AuthButton from "./auth-button";

import Link from "next/link";
import { env } from "~/env";
import Logo from "~/shared/ui/logo";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo size={9} />
          <span className="hidden font-bold sm:inline-block">Accounting</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div>
            <ThemeToggle />
          </div>
          <AuthButton botUsername={env.BOT_USERNAME} />
        </div>
      </div>
      <Separator />
    </nav>
  );
}
