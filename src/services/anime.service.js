import { http } from "@/lib/fetch"
import { getCache, setCache } from "@/lib/cache"

export async function anime(source, query) {
  const key = `anime:${source}:${query}`
  const cached = getCache(key)
  if (cached) return cached

  let result
  switch (source) {

    case "otakudesu":
      return await http(`https://api.otakudesu.example?q=${query}`)

    case "kusonime":
      return await http(`https://api.kusonime.example?q=${query}`)

    case "komiku":
      return await http(`https://api.komiku.example?q=${query}`)

    case "quotesAnime":
      return await http(`https://api.quotesanime.example`)
  setCache(key, result, 120_000)
    default:
      throw new Error("ANIME SOURCE NOT SUPPORTED")
  }
}