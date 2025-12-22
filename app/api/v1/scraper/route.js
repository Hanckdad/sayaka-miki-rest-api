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

  const { query } = await req.json()
  if (!query) {
    return NextResponse.json(
      { success: false, message: "QUERY REQUIRED" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    query,
    source: "scraper"
  })
}