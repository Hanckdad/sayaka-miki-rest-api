import crypto from "crypto"

const sessions = new Set()

export function createAdminToken() {
  const token = crypto.randomBytes(32).toString("hex")
  sessions.add(token)
  return token
}

export function verifyAdmin(req) {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.match(/admin_token=([^;]+)/)
  if (!match) return false
  return sessions.has(match[1])
}

export function destroyAdmin(token) {
  sessions.delete(token)
}