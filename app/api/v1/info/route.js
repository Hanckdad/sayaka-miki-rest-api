import { NextResponse } from "next/server"
import { apiGuard } from "@/lib/apiGuard"
import { info } from "@/src/services/info.service"

export async function POST(req) {
  const guard = await apiGuard(req, "/v1/info")
  if (guard.error) return guard.error

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
    tier: guard.tier,
    data
  })
}