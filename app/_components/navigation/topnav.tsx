import ThemeToggle from "~/app/theme/theme-select";
import AuthButton from "./auth-button";

import Link from "next/link";
import { env } from "~/env";
import Logo from "~/shared/ui/logo";
import { isAdmin } from "~/shared/utils/isAdmin";

const regularItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    hidden: true,
  },
  {
    href: "/incomes",
    label: "Incomes",
  },
  {
    href: "/expenses",
    label: "Expenses",
  },
  {
    href: "/loans",
    label: "Loans",
  },
];

const adminItems = [
  {
    href: "/tma",
    label: "TMA",
  },
];

export default async function Nav() {
  const isUserAdmin = await isAdmin();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-8 flex items-center space-x-4">
          <Logo size={10} />
          <span className="hidden font-bold sm:inline-block">Accounting</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {regularItems.map(
            (item) =>
              !item.hidden && (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  <span>{item.label}</span>
                </Link>
              ),
          )}
          {isUserAdmin && (
            <>
              |
              {adminItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div>
            <ThemeToggle />
          </div>
          <AuthButton botUsername={env.BOT_USERNAME} />
        </div>
      </div>
    </header>
  );
}
