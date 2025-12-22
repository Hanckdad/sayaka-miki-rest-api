import { http } from "@/lib/fetch"
import { getCache, setCache } from "@/lib/cache"

export async function downloader(type, url) {
  const key = `downloader:${type}:${url}`
  const cached = getCache(key)
  if (cached) return cached

  let result
  switch (type) {

    case "tiktok":
      return await http(`https://api.tiktok-downloader.example?url=${encodeURIComponent(url)}`)

    case "instagram":
      return await http(`https://api.ig-downloader.example?url=${encodeURIComponent(url)}`)

    case "fdown":
      return await http(`https://api.fb-downloader.example?url=${encodeURIComponent(url)}`)

    case "youtube":
      return await http(`https://api.yt-downloader.example?url=${encodeURIComponent(url)}`)

    case "mediafire":
      return await http(`https://api.mediafire.example?url=${encodeURIComponent(url)}`)

    case "drive":
      return await http(`https://api.drive.example?url=${encodeURIComponent(url)}`)

    case "soundcloud":
      return await http(`https://api.soundcloud.example?url=${encodeURIComponent(url)}`)

    default:
      throw new Error("DOWNLOADER TYPE NOT SUPPORTED")
  setCache(key, result, 120_000)
  return result
  }
}