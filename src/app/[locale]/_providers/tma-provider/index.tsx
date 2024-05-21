"use client";

import { useEffect, type PropsWithChildren } from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import AppRoot from "./AppRoot";
import { useServerLaunchParams } from "@/shared/hooks/useServerLaunchParams";
import { useRouter } from "@/navigation";
import { signIn } from "next-auth/react";

function LoginProvider({ children }: PropsWithChildren) {
  const lp = useServerLaunchParams();
  const router = useRouter();

  useEffect(() => {
    if (lp) {
      if (lp.startParam) {
        const params = new URLSearchParams();
        params.set("username", lp.initData?.user?.username ?? "");
        params.set("link", lp.startParam);
        router.replace("/tg/sync?" + params.toString());
      } else {
        console.log(lp.initDataRaw);
        signIn("telegram", {
          initData: lp.initDataRaw,
          redirect: false,
        })
          .then((result) => {
            if (result?.ok) {
              router.replace("/tg/home");
            } else {
              router.replace("/tg/welcome");
            }
          })
          .catch(console.error);
      }
    }
  }, [lp, router]);

  return children;
}

export default function TelegramProvider({ children }: PropsWithChildren) {
  return (
    <SDKProvider acceptCustomStyles>
      <LoginProvider>
        <AppRoot>{children}</AppRoot>
      </LoginProvider>
    </SDKProvider>
  );
}
