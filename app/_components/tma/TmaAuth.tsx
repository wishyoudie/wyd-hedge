"use client";

import { useInitDataRaw } from "@tma.js/sdk-react";
import { useSession } from "next-auth/react";
import { useEffect, type PropsWithChildren } from "react";
import { signInAs } from "~/shared/utils";

export default function TmaAuth({ children }: PropsWithChildren) {
  const initData = useInitDataRaw();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
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
  }, []);

  return <div>{children}</div>;
}
