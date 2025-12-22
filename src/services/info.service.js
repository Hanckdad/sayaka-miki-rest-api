import { http } from "@/lib/fetch"
import { getCache, setCache } from "@/lib/cache"

export async function info(type) {
  const key = `info:${type}`
  const cached = getCache(key)
  if (cached) return cached

  let result
  switch (type) {

    case "bmkg":
      return await http("https://data.bmkg.go.id")

    case "jktNews":
      return await http("https://jakartanews.example")

    default:
      throw new Error("INFO TYPE NOT SUPPORTED")
  setCache(key, result, 120_000)
  return result
  }
}