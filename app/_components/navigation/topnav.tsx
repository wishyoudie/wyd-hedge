import { Separator } from "~/shared/ui/separator";
import ThemeToggle from "~/app/theme/theme-select";
import AuthButton from "./auth-button";

import Link from "next/link";
import { env } from "~/env";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 flex w-full flex-col gap-1 bg-background pt-1">
      <div className="flex items-center justify-between px-5 py-1">
        <Link href="/">
          <div className="flex items-center gap-1 ">Accounting</div>
        </Link>
        <div className="flex items-center justify-center gap-3">
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
