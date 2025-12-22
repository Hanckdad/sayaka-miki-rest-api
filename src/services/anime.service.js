import { http } from "@/lib/fetch"

export async function anime(source, query) {
  switch (source) {

    case "otakudesu":
      return await http(`https://api.otakudesu.example?q=${query}`)

    case "kusonime":
      return await http(`https://api.kusonime.example?q=${query}`)

    case "komiku":
      return await http(`https://api.komiku.example?q=${query}`)

    case "quotesAnime":
      return await http(`https://api.quotesanime.example`)

    default:
      throw new Error("ANIME SOURCE NOT SUPPORTED")
  }
}