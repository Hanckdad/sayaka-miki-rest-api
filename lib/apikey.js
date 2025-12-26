export function verifyApiKey(req) {
  const key = req.headers.get("x-api-key")

  if (!key || key !== process.env.MASTER_API_KEY) {
    return new Response(JSON.stringify({
      success: false,
      message: "Invalid API key"
    }), { status: 401 })
  }

  return null
}