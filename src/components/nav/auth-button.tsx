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
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { useSession, signOut } from "next-auth/react";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "@/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  // botUsername: string;
  signOut: string;
  settings: string;
};

export default function AuthButton(props: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
                alt={session.user?.name ?? ""}
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
            {props.settings}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <ExitIcon className="mr-2 size-4" />
            {props.signOut}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // return <TelegramButton botUsername={props.botUsername} />;
  return <div>tgbtn</div>;
}
