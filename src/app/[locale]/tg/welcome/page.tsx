import type { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function WelcomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return <div>WelcomePage</div>;
}
