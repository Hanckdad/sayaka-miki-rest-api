import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { limitInfo } from "@/lib/limitInfo"
import { downloader } from "@/src/services/downloader.service"

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.ip ||
      "unknown"

    // RATE LIMIT
    if (rateLimit(ip)) {
      const info = limitInfo(ip)
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded",
          tier: info.tier,
          limit: info.limit
        },
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

    return NextResponse.json({
      success: true,
      tier: limitInfo(ip).tier,
      data
    })

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}