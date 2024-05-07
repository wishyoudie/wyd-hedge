"use client";

import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/dropdown-menu/dropdown-menu";
import { usePathname, useRouter } from "~/navigation";
import Settings from "~/shared/lib/settings";

export default function LocaleToggle() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (locale: string) => () => {
    if (locale !== currentLocale) {
      router.push(pathname, { locale: locale });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <GlobeIcon className="size-[1.4rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Settings.localeWidgetItems.map((item) => (
          <DropdownMenuItem
            key={item.locale}
            className="flex items-center gap-2"
            onClick={handleClick(item.locale)}
          >
            <span className="leading-normal">{item.emoji}</span>
            <span className="leading-normal">{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
