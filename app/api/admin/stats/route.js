import { NextResponse } from "next/server"
import { verifyAdmin } from "@/lib/adminAuth"
import { getUsage } from "@/lib/usage"

export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    data: getUsage()
  })
}