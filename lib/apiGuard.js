import { NextResponse } from "next/server"
import { getApiKey } from "./getApiKey"
import { getKeyData } from "./apikey"
import { rateLimit } from "./limit"
import { logUsage } from "./usage"

export async function apiGuard(req, endpoint) {
  const key = getApiKey(req)
  if (!key) {
    return {
      error: NextResponse.json(
        { success: false, message: "API key required" },
        { status: 401 }
      )
    }
  }

  const keyData = getKeyData(key)
  if (!keyData) {
    return {
      error: NextResponse.json(
        { success: false, message: "Invalid API key" },
        { status: 403 }
      )
    }
  }

  if (rateLimit(key, keyData.tier)) {
    return {
      error: NextResponse.json(
        {
          success: false,
          message: "Rate limit exceeded",
          tier: keyData.tier
        },
        { status: 429 }
      )
    }
  }

  logUsage(key, endpoint)

  return {
    key,
    tier: keyData.tier
  }
}