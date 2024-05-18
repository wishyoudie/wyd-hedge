import DuckWorkLottie from "@/components/lotties/duck-work";
import type { Locale } from "@/i18n";
import { Placeholder } from "@telegram-apps/telegram-ui";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);
  return (
    <Placeholder
      header="Work in Progress"
      description="You came in too early, we are still working on our TMA."
    >
      <DuckWorkLottie />
    </Placeholder>
  );
}
