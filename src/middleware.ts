import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";
import createMiddleware from "next-intl/middleware";
import { i18n } from "./i18n";

const withI18nMiddleware = () => {
  return createMiddleware(i18n);
};

export default chain([withAuthMiddleware, withI18nMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
