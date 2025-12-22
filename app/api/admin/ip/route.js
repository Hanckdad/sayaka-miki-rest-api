import { NextResponse } from "next/server"
import { verifyAdmin } from "@/lib/adminAuth"
import { ipTier } from "@/lib/ipTier"

export async function POST(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const { ip, tier } = await req.json()
  ipTier[ip] = tier

  return NextResponse.json({
    success: true,
    message: "IP added/updated"
  })
}

export async function DELETE(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  const { ip } = await req.json()
  delete ipTier[ip]

  return NextResponse.json({
    success: true,
    message: "IP deleted"
  })
}