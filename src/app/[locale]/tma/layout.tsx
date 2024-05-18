import { unstable_setRequestLocale } from "next-intl/server";
import TelegramProvider from "../_providers/tma-provider";
import type { Locale } from "@/i18n";

export default function TMARootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return <TelegramProvider>{children}</TelegramProvider>;
}
