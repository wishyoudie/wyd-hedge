"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/ui/dropdown-menu";
import { LoginButton } from "@telegram-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/shared/ui/avatar";
// import { Button } from "~/shared/ui/button";
import { ReloadIcon, ExitIcon } from "@radix-ui/react-icons";

import { useSession, signOut } from "next-auth/react";
import { signInAs } from "~/shared/utils";

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
            <Avatar>
              <AvatarImage src={session.user?.image ?? ""} alt="@shadcn" />
              <AvatarFallback>{session.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Test 1</DropdownMenuItem>
          <DropdownMenuItem disabled>Test 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <ExitIcon className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <LoginButton botUsername={botUsername} onAuthCallback={signInAs} />;
}
