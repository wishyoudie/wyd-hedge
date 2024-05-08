"use client";

import LogoIcon from "@/components/icons/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import ThemeDropdown from "./theme-dropdown";
import { usePathname } from "@/navigation";

export default function Aside() {
  const pathname = usePathname();
  const current = pathname.split("/")[2];

  const cn = (pn: string) =>
    current === pn
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground";

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <LogoIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Accountant</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/app/dashboard"
              className={`${cn("dashboard")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={`${cn("transactions")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Transactions</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Transactions</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={`${cn("transactions")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={`${cn("transactions")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={`${cn("transactions")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <ThemeDropdown />
        <Link
          href="/app/settings"
          className={`${cn("settings")} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
