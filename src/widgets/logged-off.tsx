import Link from "next/link";
import { env } from "~/env";
import { Button } from "~/shared/ui/button";
import { Card } from "~/shared/ui/card";
import TelegramButton from "~/shared/ui/telegram-button";

export default function LoggedOffWidget() {
  return (
    <Card className="mx-auto my-20 flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-12 lg:py-20">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Manage your finances
      </h1>
      <span className="max-w-[750px] text-center align-top text-lg text-muted-foreground sm:text-xl md:py-4">
        Accountant offers a fast, efficient and beautifully-designed solution to
        keep track of your savings. Integrated with Telegram.
      </span>
      <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
        <TelegramButton botUsername={env.BOT_USERNAME} />
        <Link href={env.MINI_APP_URL} target="_blank">
          <Button
            className="text-md h-10 w-[200px] rounded-xl pb-[13px] pt-[11px]"
            variant="secondary"
          >
            Open Mini App
          </Button>
        </Link>
      </div>
    </Card>
  );
}
