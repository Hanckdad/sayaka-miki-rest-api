export function getApiKey(req) {
  return (
    req.headers.get("x-api-key") ||
    new URL(req.url).searchParams.get("apikey")
  )
}