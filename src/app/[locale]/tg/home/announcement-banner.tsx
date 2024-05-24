"use client";

import { Link } from "@/navigation";
import { Banner, Button } from "@telegram-apps/telegram-ui";

export default function AnnouncementBanner({
  announcement,
}: {
  announcement: Partial<{
    title: string;
    description: string;
    img: string;
    label: string;
    href: string;
  }>;
}) {
  return (
    <Banner
      type="inline"
      header={announcement.title}
      subheader={announcement.description}
      style={{
        backgroundImage: `url(${announcement.img})`,
      }}
    >
      <Link href={"/tg/home" + announcement.href}>
        <Button size="s" Component="div">
          {announcement.label}
        </Button>
      </Link>
    </Banner>
  );
}
