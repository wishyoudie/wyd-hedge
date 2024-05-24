"use client";

import { Icon28AddCircle } from "@telegram-apps/telegram-ui/dist/icons/28/add_circle";
import { Icon24Home } from "@/components/icons/home";
import { Icon24Person } from "@/components/icons/person";
import { useRouter } from "@/navigation";
import { Tabbar as UITabbar } from "@telegram-apps/telegram-ui";

export default function TabBar() {
  const router = useRouter();

  const handleClick = (pathname: string) => () => {
    router.push(pathname);
  };

  return (
    <UITabbar>
      <UITabbar.Item text="Home" onClick={handleClick("/tg/home")}>
        <Icon24Home />
      </UITabbar.Item>
      <UITabbar.Item
        text="New"
        onClick={handleClick("/tg/home/transactions/new")}
      >
        <Icon28AddCircle />
      </UITabbar.Item>
      <UITabbar.Item text="Profile">
        <Icon24Person />
      </UITabbar.Item>
    </UITabbar>
  );
}
