import { http } from "@/lib/fetch"

export async function info(type) {
  switch (type) {

    case "bmkg":
      return await http("https://data.bmkg.go.id")

    case "jktNews":
      return await http("https://jakartanews.example")

    default:
      throw new Error("INFO TYPE NOT SUPPORTED")
  }
}