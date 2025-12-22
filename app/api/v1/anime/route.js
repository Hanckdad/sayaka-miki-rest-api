import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/limit"
import { anime } from "@/src/services/anime.service"

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"
    if (rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded" },
        { status: 429 }
      )
    }

    const { source, query } = await req.json()
    if (!source) {
      return NextResponse.json(
        { success: false, message: "source required" },
        { status: 400 }
      )
    }

    const data = await anime(source, query)
    return NextResponse.json({ success: true, data })

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}