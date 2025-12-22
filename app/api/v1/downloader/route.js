import { NextResponse } from "next/server"
import { apiGuard } from "@/lib/apiGuard"
import { downloader } from "@/src/services/downloader.service"

export async function POST(req) {
  const guard = await apiGuard(req, "/v1/downloader")
  if (guard.error) return guard.error

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
    tier: guard.tier,
    data
  })
}