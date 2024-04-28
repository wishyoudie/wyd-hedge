import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Settings from "./shared/lib/settings";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: Settings.locales,
    localePrefix: undefined,
  });
