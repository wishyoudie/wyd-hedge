import { NextResponse } from "next/server";

export async function GET(request: Response) {
  return NextResponse.json({ welcome: "hi" });
}
