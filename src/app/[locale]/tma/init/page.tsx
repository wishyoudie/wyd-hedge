"use client";

import { useInitDataRaw, useMiniApp } from "@tma.js/sdk-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { signInAs } from "@/shared/utils";

export default function TmaAuth() {
  const initData = useInitDataRaw();
  const miniApp = useMiniApp();
  const { data: session, status } = useSession();

  useEffect(() => {
    miniApp.setHeaderColor("#0a0a0a");
    if (status !== "unauthenticated" && !session?.user) {
      if (initData) {
        signInAs(
          {
            is_tma: true,
            initData: initData,
          },
          "/tma",
        );
      } else {
        throw new Error("Accessing TMA without initData");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user]);

  return <></>;
}
