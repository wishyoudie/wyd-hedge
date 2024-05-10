import { getServerSession } from "@/app/api/auth/options";
import AuthButton from "@/app/[locale]/app/_components/auth-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SlashIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";

export function TypographyH4() {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      People stopped telling jokes
    </h4>
  );
}

export default async function Header() {
  const { user } = await getServerSession();

  return (
    <header className="sticky top-0 z-30 flex h-14 gap-4 border-0 bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:ml-14 sm:border-b ">
      <div className="hidden items-center gap-2 sm:flex">
        <SlashIcon className="mx-[-6px] size-3.5 text-muted-foreground" />
        <p className="text-balance text-sm leading-relaxed text-muted-foreground">
          {user.name ?? user.username}
          &apos; s Accountant
        </p>
        <Badge variant={user.isPremium ? "default" : "outline"}>
          {user.isPremium ? "Premium" : "Basic"}
        </Badge>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <AuthButton signOut="Sign Out" user={user} />
    </header>
  );
}
