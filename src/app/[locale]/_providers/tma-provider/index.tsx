"use client";

import type { PropsWithChildren } from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import AppRoot from "./AppRoot";

export default function TelegramProvider({ children }: PropsWithChildren) {
  return (
    <SDKProvider acceptCustomStyles>
      <AppRoot>{children}</AppRoot>
    </SDKProvider>
  );
}
