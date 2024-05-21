import { AppRoot as AR } from "@telegram-apps/telegram-ui";
import { useEffect, type PropsWithChildren } from "react";
import "@telegram-apps/telegram-ui/dist/styles.css";
import {
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  type LaunchParams,
} from "@tma.js/sdk-react";
import { useServerLaunchParams } from "@/shared/hooks/useServerLaunchParams";

const resolvePlatform = (lp: LaunchParams | null): "base" | "ios" => {
  if (lp && (lp.platform === "ios" || lp.platform === "macos")) {
    return "ios";
  }

  return "base";
};

export default function AppRoot(props: PropsWithChildren) {
  const miniApp = useMiniApp(true);
  const themeParams = useThemeParams(true);
  const viewport = useViewport(true);
  const lp = useServerLaunchParams();

  useEffect(() => {
    if (miniApp && themeParams) {
      return bindMiniAppCSSVars(miniApp, themeParams);
    }
  }, [miniApp, themeParams]);

  useEffect(() => {
    if (themeParams) {
      return bindThemeParamsCSSVars(themeParams);
    }
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);

  return <AR platform={resolvePlatform(lp)}>{props.children}</AR>;
}
