import type { Locale } from "@/i18n";
import Logo from "@/components/logo/logo";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <Logo />
    </div>
  );
}
