import { NextResponse } from "next/server"
import { apiGuard } from "@/lib/apiGuard"
import { tools } from "@/src/services/tools.service"

export async function POST(req) {
  const guard = await apiGuard(req, "/v1/tools")
  if (guard.error) return guard.error

  const body = await req.json()
  if (!body.type) {
    return NextResponse.json(
      { success: false, message: "type required" },
      { status: 400 }
    )
  }

  const data = await tools(body.type, body)

  return NextResponse.json({
    success: true,
    tier: guard.tier,
    data
  })
}