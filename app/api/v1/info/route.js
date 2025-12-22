import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  if (rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Rate limit exceeded" },
      { status: 429 }
    )
  }

  return NextResponse.json({
    success: true,
    info: "BMKG / Jakarta News"
  })
}