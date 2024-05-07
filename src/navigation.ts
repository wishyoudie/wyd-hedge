import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { i18n } from "./i18n";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: i18n.locales,
    // localePrefix: undefined,
  });
