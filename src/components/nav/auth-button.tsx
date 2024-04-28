"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/avatar/avatar";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { useSession, signOut } from "next-auth/react";
import TelegramButton from "../telegram-button/telegram-button";
import Spinner from "~/components/spinner/spinner";
import { useRouter } from "~/navigation";
import { Skeleton } from "~/components/skeleton/skeleton";
import { useTranslations } from "next-intl";

export default function AuthButton({ botUsername }: { botUsername: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("web");

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar className="size-10">
              <AvatarImage
                src={session.user?.image ?? ""}
                alt={session.user?.name}
              />
              <AvatarFallback>
                <Skeleton className="size-10" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/web/settings")}>
            <GearIcon className="mr-2 size-4" />
            {t("settings.short")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <ExitIcon className="mr-2 size-4" />
            {t("signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <TelegramButton botUsername={botUsername} />;
}
