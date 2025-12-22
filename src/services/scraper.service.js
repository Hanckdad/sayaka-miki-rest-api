import { http } from "@/lib/fetch"
import { getCache, setCache } from "@/lib/cache"

export async function scraper(source, query) {
  const key = `scraper:${source}:${query}`
  const cached = getCache(key)
  if (cached) return cached

  let result

  switch (source) {
    case "pinterest":
      result = await http(`https://api.pinterest.example?q=${query}`)
      break
    case "playstore":
      result = await http(`https://api.playstore.example?q=${query}`)
      break
    case "bukalapak":
      result = await http(`https://api.bukalapak.example?q=${query}`)
      break
    case "halodoc":
      result = await http(`https://api.halodoc.example?q=${query}`)
      break
    default:
      throw new Error("SCRAPER SOURCE NOT SUPPORTED")
  }

  setCache(key, result, 120_000)
  return result
}