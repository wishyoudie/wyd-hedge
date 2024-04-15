"use client";

import { isTMA } from "@tma.js/sdk";
import { redirect } from "next/navigation";

export function EnvDecider() {
  redirect(isTMA() ? "/tma" : "/web");

  return <></>;
}
