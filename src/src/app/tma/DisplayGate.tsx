import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import { useSDKContext } from "@tma.js/sdk-react";

import SDKProviderError from "./SDKProviderError";
import SDKProviderLoading from "./SDKProviderLoading";

import { NOT_TMA_MESSAGE } from "~/src/shared/const";

function render(Component: ReactNode | ComponentType): ReactNode;
function render<T extends object>(
  Component: ReactNode | ComponentType<T>,
  props: T,
): ReactNode;
function render(Component: ReactNode | ComponentType, props = {}): ReactNode {
  return typeof Component === "function" ? <Component {...props} /> : Component;
}

export default function DisplayGate({ children }: PropsWithChildren) {
  const { initResult, error } = useSDKContext();

  if (initResult) {
    return children;
  }

  if (error) {
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);

    if (message === NOT_TMA_MESSAGE) {
      return children;
    }

    return render(SDKProviderError, { message });
  } else {
    return render(SDKProviderLoading);
  }
}
