import { NextResponse } from "next/server"
import { apiGuard } from "@/lib/apiGuard"
import { scraper } from "@/src/services/scraper.service"

export async function POST(req) {
  const guard = await apiGuard(req, "/v1/scraper")
  if (guard.error) return guard.error

  const { source, query } = await req.json()
  if (!source || !query) {
    return NextResponse.json(
      { success: false, message: "source & query required" },
      { status: 400 }
    )
  }

  const data = await scraper(source, query)

  return NextResponse.json({
    success: true,
    tier: guard.tier,
    data
  })
}