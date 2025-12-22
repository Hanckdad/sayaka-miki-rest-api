import { http } from "@/lib/fetch"

export async function scraper(source, query) {
  switch (source) {

    case "pinterest":
      return await http(`https://api.pinterest.example?q=${query}`)

    case "playstore":
      return await http(`https://api.playstore.example?q=${query}`)

    case "bukalapak":
      return await http(`https://api.bukalapak.example?q=${query}`)

    case "halodoc":
      return await http(`https://api.halodoc.example?q=${query}`)

    default:
      throw new Error("SCRAPER SOURCE NOT SUPPORTED")
  }
}