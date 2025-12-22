import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { limitInfo } from "@/lib/limitInfo"
import { tools } from "@/src/services/tools.service"

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.ip ||
      "unknown"

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

    const body = await req.json()
    if (!body.type) {
      return NextResponse.json(
        { success: false, message: "type required" },
        { status: 400 }
      )
    }

    const data = await tools(body.type, body)

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