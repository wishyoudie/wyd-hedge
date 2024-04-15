"use client";

import type { PropsWithChildren } from "react";
import { SDKProvider } from "@tma.js/sdk-react";

import DisplayGate from "./DisplayGate";

export function TmaSDKLoader({ children }: PropsWithChildren) {
  return (
    <SDKProvider
      options={{ cssVars: true, acceptCustomStyles: true, async: true }}
    >
      <DisplayGate>{children}</DisplayGate>
    </SDKProvider>
  );
}
