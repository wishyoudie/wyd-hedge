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
import { signIn } from "next-auth/react";
import { useRouter } from "@/navigation";

const resolvePlatform = (lp: LaunchParams | null): "base" | "ios" => {
  if (lp && (lp.platform === "ios" || lp.platform === "macos")) {
    return "ios";
  }

  return "base";
};

export default function AppRoot(props: PropsWithChildren) {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const lp = useServerLaunchParams();
  const router = useRouter();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);

  useEffect(() => {
    if (lp) {
      if (lp.startParam) {
        const params = new URLSearchParams();
        params.set("username", lp.initData?.user?.username ?? "");
        params.set("link", lp.startParam);
        router.replace("/tg/sync?" + params.toString());
      } else {
        signIn("telegram", {
          initData: lp.initDataRaw,
          redirect: false,
        })
          .then((result) => {
            if (result?.ok) {
              router.replace("/tg/home");
            } else {
              router.replace("/tg/welcome");
            }
          })
          .catch(console.error);
      }
    }
  }, [lp, router]);

  return <AR platform={resolvePlatform(lp)}>{props.children}</AR>;
}
