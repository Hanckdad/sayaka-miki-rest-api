import { NextResponse } from "next/server"
import { getApiKey } from "@/lib/getApiKey"
import { getKeyData } from "@/lib/apikey"
import { rateLimit } from "@/lib/limit"
import { logUsage } from "@/lib/usage"
import { downloader } from "@/src/services/downloader.service"

export async function POST(req) {
  const key = getApiKey(req)
  if (!key)
    return NextResponse.json(
      { success: false, message: "API key required" },
      { status: 401 }
    )

  const keyData = getKeyData(key)
  if (!keyData)
    return NextResponse.json(
      { success: false, message: "Invalid API key" },
      { status: 403 }
    )

  if (rateLimit(key, keyData.tier)) {
    return NextResponse.json(
      {
        success: false,
        message: "Rate limit exceeded",
        tier: keyData.tier
      },
      { status: 429 }
    )
  }

  logUsage(key, "/v1/downloader")

  const { type, url } = await req.json()
  const data = await downloader(type, url)

  return NextResponse.json({
    success: true,
    tier: keyData.tier,
    data
  })
}