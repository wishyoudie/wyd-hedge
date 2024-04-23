"use client";

import { LoginButton } from "@telegram-auth/react";
import { useTheme } from "next-themes";
import { signInAs } from "~/shared/utils";

const defaultFilter = "saturate(0%) brightness(70%) contrast(500%)";

export default function TelegramButton({
  botUsername,
}: {
  botUsername: string;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <div
      style={{
        filter:
          resolvedTheme === "light"
            ? defaultFilter
            : `${defaultFilter} invert(1)`,
      }}
    >
      <LoginButton
        botUsername={botUsername}
        onAuthCallback={(data) => signInAs({ is_tma: false, ...data }, "/web")}
        showAvatar={false}
        cornerRadius={12}
      />
    </div>
  );
}
