"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
import { ReloadIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { useSession, signOut } from "next-auth/react";
import TelegramButton from "../../../src/shared/ui/telegram-button";

export default function AuthButton({ botUsername }: { botUsername: string }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ReloadIcon className="h-6 w-6 animate-spin" />;
  }

  if (status === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar className="size-10">
              <AvatarImage src={session.user?.image ?? ""} alt="@shadcn" />
              <AvatarFallback>{session.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <GearIcon className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <TelegramButton botUsername={botUsername} />;
}
