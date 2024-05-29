import type { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import LastUserTransactionsSection from "./last-transactions";
import BalanceSection from "./balance";
import Announcement from "./announcement";
import { List } from "@telegram-apps/telegram-ui";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="pb-14">
      <Announcement />
      <div className="h-5 w-5 bg-telegram-link"></div>
      <List>
        <BalanceSection />
        <LastUserTransactionsSection />
      </List>
    </div>
  );
}
