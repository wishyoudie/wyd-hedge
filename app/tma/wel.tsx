"use client";

import { useInitData } from "@tma.js/sdk-react";

export default function Welcome() {
  const initData = useInitData();

  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
      Welcome, {initData?.user?.username}
    </h1>
  );
}
