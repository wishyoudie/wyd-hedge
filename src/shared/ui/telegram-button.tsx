"use client";

import { LoginButton } from "@telegram-auth/react";
import { signInAs } from "~/shared/utils";

export default function TelegramButton({
  botUsername,
}: {
  botUsername: string;
}) {
  return (
    <div className="telegram-button">
      <LoginButton
        botUsername={botUsername}
        onAuthCallback={signInAs}
        showAvatar={false}
        cornerRadius={12}
      />
    </div>
  );
}
