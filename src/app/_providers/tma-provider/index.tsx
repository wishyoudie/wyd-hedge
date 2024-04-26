"use client";

import "@xelene/tgui/dist/styles.css";
import type { PropsWithChildren } from "react";
import { DisplayGate, SDKProvider } from "@tma.js/sdk-react";
import SDKProviderError from "./SDKProviderError";
import AppRoot from "./AppRoot";
import SDKProviderLoading from "./SDKProviderLoading";

export default function TmaSDKLoader({ children }: PropsWithChildren) {
  return (
    <SDKProvider
      options={{ cssVars: true, acceptCustomStyles: true, async: true }}
    >
      <DisplayGate
        error={SDKProviderError}
        loading={<div className="h-screen w-screen bg-green-400">LOADING</div>}
        initial={<div className="h-screen w-screen bg-red-400">INITIAL</div>}
      >
        <AppRoot>{children}</AppRoot>
      </DisplayGate>
    </SDKProvider>
  );
}
