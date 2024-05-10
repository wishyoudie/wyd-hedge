import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";

import { getToken } from "next-auth/jwt";
import { type Locale, i18n } from "../i18n";
import { type CustomMiddleware } from "./chain";
import Settings from "@/shared/lib/settings";

const protectedPaths = Settings.protectedRoutes;

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  const protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach((locale) =>
      protectedPathsWithLocale.push(`/${locale}${route}`),
    );
  });

  return protectedPathsWithLocale;
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const token = await getToken({ req: request });

    // @ts-expect-error ASD
    request.nextauth = request.nextauth || {};
    // @ts-expect-error ASD
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    if (!token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL("/api/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return middleware(request, event, response);
  };
}
