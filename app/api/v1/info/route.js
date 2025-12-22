import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { limitInfo } from "@/lib/limitInfo"
import { info } from "@/src/services/info.service"

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.ip ||
      "unknown"

    if (rateLimit(ip)) {
      const infoTier = limitInfo(ip)
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded",
          tier: infoTier.tier,
          limit: infoTier.limit
        },
        { status: 429 }
      )
    }

    const { type } = await req.json()
    if (!type) {
      return NextResponse.json(
        { success: false, message: "type required" },
        { status: 400 }
      )
    }

    const data = await info(type)

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