"use client";

import { LoginButton, type TelegramAuthData } from "@telegram-auth/react";
import { signOut, signIn, useSession } from "next-auth/react";

export default function SignInButton({ botUsername }: { botUsername: string }) {
  const { status } = useSession();

  if (status === "loading") {
    return <h2>Loading</h2>;
  }

  if (status === "authenticated") {
    return (
      <>
        <h2 onClick={() => signOut()}>Sign out</h2>
      </>
    );
  }
  return (
    <LoginButton
      botUsername={botUsername}
      onAuthCallback={(data: TelegramAuthData) => {
        signIn("telegram-login", { callbackUrl: "/" }, data);
      }}
    />
  );
}
