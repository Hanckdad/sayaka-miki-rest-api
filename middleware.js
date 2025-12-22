import { NextResponse } from "next/server"

export function middleware(req) {
  const ua = req.headers.get("user-agent") || ""

  if (!ua || ua.length < 10) {
    return NextResponse.json(
      { success: false, message: "Invalid client" },
      { status: 403 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*"
}