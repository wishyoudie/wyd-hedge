import { createSyncLink } from "@/server/users";
import { NextResponse } from "next/server";

export async function GET() {
  const { startapp, timeLeft } = await createSyncLink();
  return NextResponse.json({ startapp, timeLeft });
}
