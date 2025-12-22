import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { downloader } from "@/src/services/downloader.service"

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    if (rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded" },
        { status: 429 }
      )
    }

    const { type, url } = await req.json()
    if (!type || !url) {
      return NextResponse.json(
        { success: false, message: "type & url required" },
        { status: 400 }
      )
    }

    const data = await downloader(type, url)
    return NextResponse.json({ success: true, data })

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}