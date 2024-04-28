"use client";
import { useSettingsButton } from "@tma.js/sdk-react";
import { useRouter } from "~/navigation";
import { useEffect } from "react";

export default function SettingsButton() {
  const sb = useSettingsButton();
  const router = useRouter();

  useEffect(() => {
    const onClick = () => router.push("/tma/settings");

    sb.on("click", onClick);
    sb.show();
    return () => {
      sb.off("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
