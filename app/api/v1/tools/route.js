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

  const body = await req.json()

  switch (body.type) {
    case "upscale":
      return NextResponse.json({ success: true, action: "upscale", image: body.image })
    case "remini":
      return NextResponse.json({ success: true, action: "remini", image: body.image })
    case "lyrics":
      return NextResponse.json({ success: true, query: body.query })
    case "alightmotion":
      return NextResponse.json({ success: true, query: body.query })

    default:
      return NextResponse.json(
        { success: false, message: "UNKNOWN TOOL" },
        { status: 400 }
      )
  }
}