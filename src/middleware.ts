import createMiddleware from "next-intl/middleware";
import Settings from "./shared/lib/settings";

export default createMiddleware({
  defaultLocale: "ru",
  locales: Settings.locales,
  localePrefix: undefined,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ru|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
