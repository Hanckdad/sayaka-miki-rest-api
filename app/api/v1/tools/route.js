import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { tools } from "@/src/services/tools.service"

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    if (rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded" },
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
    return NextResponse.json({ success: true, data })

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}