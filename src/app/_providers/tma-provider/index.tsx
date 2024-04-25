"use client";

import type { PropsWithChildren } from "react";
import { DisplayGate, SDKProvider } from "@tma.js/sdk-react";
import SDKProviderError from "./SDKProviderError";
import SDKProviderLoading from "./SDKProviderLoading";

export default function TmaSDKLoader({ children }: PropsWithChildren) {
  return (
    <SDKProvider
      options={{ cssVars: true, acceptCustomStyles: true, async: true }}
    >
      <DisplayGate
        error={SDKProviderError}
        loading={SDKProviderLoading}
        initial={SDKProviderLoading}
      >
        {children}
      </DisplayGate>
    </SDKProvider>
  );
}
