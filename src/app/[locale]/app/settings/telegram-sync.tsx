"use client";

import { Icon24Telegram } from "@/components/icons/telegram";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { type MouseEventHandler } from "react";
import { toast } from "sonner";

type Props = {
  miniAppUrl: string;
  data: string;
  isSynced: boolean;
};

export default function TelegramSync({ miniAppUrl, data, isSynced }: Props) {
  if (isSynced) {
    return (
      <div className="flex items-center gap-2 pt-4">
        <Input type="text" name="tgUsername" value={`@${data}`} disabled />
        {/* <Button variant="ghost">Change</Button> */}
      </div>
    );
  }

  const handleCopyClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(miniAppUrl + `?startapp=${data}`)
      .then(() => {
        toast("Copied");
      })
      .catch(() => {
        toast("Error while copying");
      });
  };

  const handleOpenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.open(miniAppUrl + `?startapp=${data}`);
  };

  return (
    <div className="flex items-center gap-2 pt-4">
      <Input type="text" name="tgUsername" value={data} disabled />
      <Button size="icon" variant="ghost" onClick={handleCopyClick}>
        <CopyIcon className="size-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={handleOpenClick}>
        <Icon24Telegram />
      </Button>
    </div>
  );
}
