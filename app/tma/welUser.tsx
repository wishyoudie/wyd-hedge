"use client";

import { useInitData } from "@tma.js/sdk-react";
import Welcome from "./wel";

export default function WelUser() {
  const initData = useInitData();

  return <Welcome text={initData?.user?.username} />;
}
