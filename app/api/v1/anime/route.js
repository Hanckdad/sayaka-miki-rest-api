import { NextResponse } from "next/server"
import { apiGuard } from "@/lib/apiGuard"
import { anime } from "@/src/services/anime.service"

export async function POST(req) {
  const guard = await apiGuard(req, "/v1/anime")
  if (guard.error) return guard.error

  const { source, query } = await req.json()
  if (!source) {
    return NextResponse.json(
      { success: false, message: "source required" },
      { status: 400 }
    )
  }

  const data = await anime(source, query)

  return NextResponse.json({
    success: true,
    tier: guard.tier,
    data
  })
}