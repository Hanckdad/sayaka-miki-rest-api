import { NextResponse } from "next/server"
import { createAdminToken } from "@/lib/adminAuth"

export async function POST(req) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "Password salah" },
      { status: 401 }
    )
  }

  const token = createAdminToken()

  const res = NextResponse.json({
    success: true,
    message: "Login success"
  })

  res.headers.append(
    "Set-Cookie",
    `admin_token=${token}; HttpOnly; Path=/`
  )

  return res
}