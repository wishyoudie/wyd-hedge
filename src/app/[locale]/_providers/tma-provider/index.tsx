"use client";

import "@telegram-apps/telegram-ui/dist/styles.css";
import type { PropsWithChildren } from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import AppRoot from "./AppRoot";

export default function TmaSDKLoader({ children }: PropsWithChildren) {
  return (
    <SDKProvider acceptCustomStyles>
      <AppRoot>{children}</AppRoot>
    </SDKProvider>
  );
}
