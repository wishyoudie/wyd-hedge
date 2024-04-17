import { signIn } from "next-auth/react";
import { type TelegramUserData } from "@telegram-auth/server";

type SignInData =
  | ({
      is_tma: false;
    } & TelegramUserData)
  | {
      is_tma: true;
      initData: string;
    };

export function signInAs(data: SignInData) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  signIn("telegram-login", { callbackUrl: "/" }, data as any).catch(
    console.error,
  );
}
