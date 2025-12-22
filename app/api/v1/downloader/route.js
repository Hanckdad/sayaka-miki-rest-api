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

  const { type, url } = await req.json()
  if (!type || !url) {
    return NextResponse.json(
      { success: false, message: "INVALID PARAM" },
      { status: 400 }
    )
  }

  switch (type) {
    case "tiktok":
      return NextResponse.json({ success: true, platform: "tiktok", url })
    case "instagram":
      return NextResponse.json({ success: true, platform: "instagram", url })
    case "fdown":
      return NextResponse.json({ success: true, platform: "facebook", url })
    case "youtube":
      return NextResponse.json({ success: true, platform: "youtube", url })
    case "mediafire":
      return NextResponse.json({ success: true, platform: "mediafire", url })
    case "drive":
      return NextResponse.json({ success: true, platform: "drive", url })
    case "soundcloud":
      return NextResponse.json({ success: true, platform: "soundcloud", url })

    default:
      return NextResponse.json(
        { success: false, message: "UNKNOWN TYPE" },
        { status: 400 }
      )
  }
}