export const config = {
  site: process.env.NEXT_PUBLIC_SITE_NAME,
  url: process.env.NEXT_PUBLIC_SITE_URL,
  limit: Number(process.env.RATE_LIMIT || 20)
}