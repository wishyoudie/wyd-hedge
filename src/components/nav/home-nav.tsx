import ThemeToggle from "~/components/theme-select/theme-select";

import { Link } from "~/navigation";
import Logo from "~/components/logo/logo";

export default function HomeNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/web" className="mr-8 flex items-center space-x-4">
          <Logo size={10} />
          <span className="hidden font-bold sm:inline-block">Accountant</span>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
