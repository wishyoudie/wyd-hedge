import type { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import LogoIcon from "@/components/icons/logo";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-telegram-background">
      <LogoIcon />
    </div>
  );
}
