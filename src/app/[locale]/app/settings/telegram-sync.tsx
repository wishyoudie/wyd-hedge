"use client";

import { Icon24Telegram } from "@/components/icons/telegram";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { type MouseEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

function Timer({ time }: { time: number }) {
  return (
    <span className="absolute right-3 text-sm text-muted-foreground">
      {`${Math.floor(time / 60)}`.padStart(2, "0")}:
      {`${time % 60}`.padStart(2, "0")}
    </span>
  );
}

type Props = {
  miniAppUrl: string;
  generated?: string;
  timeLeft?: number;
};

export default function TelegramSync({
  miniAppUrl,
  generated,
  timeLeft,
}: Props) {
  const [link, setLink] = useState<string | undefined>(generated);
  const [time, setTime] = useState<number | undefined>(timeLeft);

  useEffect(() => {
    if (link) {
      const timer = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(timer);
            setLink(undefined);
            return 0;
          } else {
            return time! - 1;
          }
        });
      }, 1000);
    }
  }, [link]);

  if (!link) {
    const handleGenerateClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();

      fetch("/api/sync", {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          setLink(res.startapp);
          setTime(res.timeLeft);
        })
        .catch(console.error);
    };

    return (
      <div className="flex flex-1 items-center justify-center py-2">
        <div>
          <Button onClick={handleGenerateClick}>Generate Sync Link</Button>
        </div>
      </div>
    );
  }

  const handleCopyClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(miniAppUrl + `?startapp=${link}`)
      .then(() => {
        toast("Copied");
      })
      .catch(() => {
        toast("Error while copying");
      });
  };

  const handleOpenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.open(miniAppUrl + `?startapp=${link}`);
  };

  return (
    <div className="flex items-center gap-2 pt-4">
      <span className="relative flex flex-1 items-center">
        <Input type="text" name="username" value={link} disabled />
        <Timer time={time!} />
      </span>
      <Button size="icon" variant="ghost" onClick={handleCopyClick}>
        <CopyIcon className="size-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={handleOpenClick}>
        <Icon24Telegram />
      </Button>
    </div>
  );
}
