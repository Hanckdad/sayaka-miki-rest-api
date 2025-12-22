import { http } from "@/lib/fetch"

export async function tools(type, payload) {
  switch (type) {

    case "upscale":
      return await http("https://api.upscale.example", {
        method: "POST",
        body: JSON.stringify({ image: payload.image })
      })

    case "remini":
      return await http("https://api.remini.example", {
        method: "POST",
        body: JSON.stringify({ image: payload.image })
      })

    case "lyrics":
      return await http(`https://api.lyrics.example?q=${payload.query}`)

    case "alightmotion":
      return await http(`https://api.alightmotion.example?q=${payload.query}`)

    default:
      throw new Error("TOOLS TYPE NOT SUPPORTED")
  }
}