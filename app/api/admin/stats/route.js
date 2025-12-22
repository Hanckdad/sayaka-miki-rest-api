import { NextResponse } from "next/server"
import { verifySession } from "@/lib/adminSession"
import { getUsage } from "@/lib/usage"

export async function GET(req) {
  if (!(await verifySession(req)))
    return NextResponse.json({ success: false }, { status: 401 })

  return NextResponse.json({
    success: true,
    data: getUsage()
  })
}