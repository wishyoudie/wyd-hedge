"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";

import { signOut } from "next-auth/react";
import { User2 } from "lucide-react";
import { Button } from "../ui/button";
import type { User } from "next-auth";

type Props = {
  // botUsername: string;
  signOut: string;
  user: User;
};

export default function AuthButton(props: Props) {
  if (props.user.showTutorial) {
    alert("Wanna go for a tutorial?");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10">
          <AvatarImage
            src={props.user.image ?? ""}
            alt={props.user.name ?? ""}
          />
          <AvatarFallback>
            <Button size="icon" className="size-10 rounded-full">
              <User2 className="size-6" />
            </Button>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {props.user.name ?? props.user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <ExitIcon className="mr-2 size-4" />
          {props.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
