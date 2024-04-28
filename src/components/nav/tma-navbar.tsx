"use client";

import { useRouter } from "~/navigation";
import { Tabbar } from "@xelene/tgui";
import { Icon24Person } from "~/components/icons/person";
import { Icon24Archive } from "~/components/icons/archive";
import { Icon24Home } from "~/components/icons/home";
import { memo, useState } from "react";
import { useTranslations } from "next-intl";

export const TMANavbar = memo(function TMANavbar() {
  const [section, setSection] = useState("/tma");
  const router = useRouter();
  const t = useTranslations("tma.navbar");

  const handleClick = (href: string) => () => {
    setSection(href);
    router.push(href);
  };

  return (
    <Tabbar>
      <Tabbar.Item
        text={t("home")}
        selected={section === "/tma"}
        onClick={handleClick("/tma")}
      >
        <Icon24Home />
      </Tabbar.Item>
      <Tabbar.Item
        text={t("operations")}
        selected={section === "/tma/operations"}
        onClick={handleClick("/tma/operations")}
      >
        <Icon24Archive />
      </Tabbar.Item>
      <Tabbar.Item
        text={t("profile")}
        selected={section === "/tma/profile"}
        onClick={handleClick("/tma/profile")}
      >
        <Icon24Person />
      </Tabbar.Item>
    </Tabbar>
  );
});
