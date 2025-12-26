export function requireAdminAuth(req) {
  const key = req.headers.get("x-admin-key")

  if (!key || key !== process.env.ADMIN_SECRET) {
    return new Response(JSON.stringify({
      success: false,
      message: "Unauthorized admin session"
    }), { status: 401 })
  }

  return null
}