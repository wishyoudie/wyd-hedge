import ThemeToggle from "~/components/theme-select/theme-select";
import AuthButton from "./auth-button";

import { Link } from "~/navigation";
import { env } from "~/env";
import Logo from "~/components/logo/logo";
import { isAdmin } from "~/shared/utils/isAdmin";
import { useTranslations } from "next-intl";

const adminItems = [
  {
    href: "/tma",
    label: "TMA",
  },
];

export default async function Nav() {
  const isUserAdmin = await isAdmin();
  const t = useTranslations("web.navbar");
  const regularItems = [
    {
      href: "/web",
      label: t("dashboard"),
      hidden: true,
    },
    {
      href: "/web/operations",
      label: t("operations"),
    },
    {
      href: "/web/loans",
      label: t("loans"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/web" className="mr-8 flex items-center space-x-4">
          <Logo size={10} />
          <span className="hidden font-bold sm:inline-block">Accountant</span>
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
