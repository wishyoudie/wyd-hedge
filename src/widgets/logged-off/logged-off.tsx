import Link from "next/link";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TelegramButton from "@/components/telegram-button/telegram-button";
import { useTranslations } from "next-intl";

export default function LoggedOffWidget() {
  const t = useTranslations("web.loggedoff");

  return (
    <Card className="mx-auto my-20 flex max-w-[980px] flex-col items-center gap-2 px-4 py-8 md:py-12 md:pb-12 lg:py-20">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        {t("slogan")}
      </h1>
      <span className="max-w-[750px] text-center align-top text-lg text-muted-foreground sm:text-xl md:py-4">
        {t("description")}
      </span>
      <div className="flex w-full flex-col items-center justify-center gap-4 py-4 md:flex-row md:pb-10">
        <TelegramButton botUsername={env.BOT_USERNAME} />
        <Link href={env.MINI_APP_URL} target="_blank">
          <Button
            className="text-md h-10 w-[225px] rounded-xl pb-[13px] pt-[11px] md:w-[200px]"
            variant="secondary"
          >
            {t("open")}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
