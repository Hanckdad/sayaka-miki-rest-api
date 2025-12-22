import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { downloader } from "@/src/services/downloader.service"

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  if (rateLimit(ip)) {
    return NextResponse.json({ success: false, message: "LIMIT" }, { status: 429 })
  }

  const { type, url } = await req.json()
  const data = await downloader(type, url)

  return NextResponse.json({ success: true, data })
}