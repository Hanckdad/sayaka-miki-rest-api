import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { endpoint, method, body } = await req.json()

    if (!endpoint || !method) {
      return NextResponse.json(
        { success: false, message: "INVALID REQUEST" },
        { status: 400 }
      )
    }

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: method !== "GET" ? JSON.stringify(body || {}) : undefined
    })

    const text = await res.text()

    let json
    try {
      json = JSON.parse(text)
    } catch {
      json = text
    }

    return NextResponse.json({
      success: true,
      status: res.status,
      response: json
    })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}