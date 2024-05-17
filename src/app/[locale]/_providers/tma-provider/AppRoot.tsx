import { useLaunchParams } from "@tma.js/sdk-react";
import { AppRoot as AR } from "@telegram-apps/telegram-ui";
import type { PropsWithChildren } from "react";

const resolvePlatform = (platform: string): "base" | "ios" => {
  if (platform === "ios" || platform === "macos") {
    return "ios";
  }

  return "base";
};

export default function AppRoot(props: PropsWithChildren) {
  const { platform } = useLaunchParams();

  return <AR platform={resolvePlatform(platform)}>{props.children}</AR>;
}
