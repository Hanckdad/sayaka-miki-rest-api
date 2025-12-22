import { NextResponse } from "next/server"
import { verifySession } from "@/lib/adminSession"
import { addKey, deleteKey } from "@/lib/apikey"
import crypto from "crypto"

export async function POST(req) {
  if (!(await verifySession(req)))
    return NextResponse.json({ success: false }, { status: 401 })

  const { tier } = await req.json()
  const key = crypto.randomBytes(16).toString("hex")

  addKey(key, tier)

  return NextResponse.json({
    success: true,
    apikey: key,
    tier
  })
}

export async function DELETE(req) {
  if (!(await verifySession(req)))
    return NextResponse.json({ success: false }, { status: 401 })

  const { key } = await req.json()
  deleteKey(key)

  return NextResponse.json({ success: true })
}