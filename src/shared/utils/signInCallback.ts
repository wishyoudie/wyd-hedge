import { signIn } from "next-auth/react";
import { type TelegramUserData } from "@telegram-auth/server";

export function signInAs(data: TelegramUserData) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  signIn("telegram-login", { callbackUrl: "/" }, data as any).catch(
    console.error,
  );
}
