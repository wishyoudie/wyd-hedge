"use client";

import { Banner, Button } from "@telegram-apps/telegram-ui";

export default function Announcement() {
  return (
    <Banner
      type="inline"
      header="Introducing TON Space"
      subheader="Start exploring TON in a new, better way"
      style={{
        backgroundImage:
          "url(https://cryptodaily.blob.core.windows.net/space/Telegram%20x%20TON%20Space%20H-comp4final.jpg)",
      }}
    >
      <Button size="s" Component="a" target="_blank">
        Try it out
      </Button>
    </Banner>
  );
}
