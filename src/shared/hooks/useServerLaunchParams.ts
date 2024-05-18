import { retrieveLaunchParams } from "@tma.js/sdk-react";
import { useMount } from "./useMount";
import { useMemo } from "react";

export function useServerLaunchParams() {
  const mount = useMount();
  const lp = useMemo(() => {
    return mount ? retrieveLaunchParams() : null;
  }, [mount]);

  return lp;
}
