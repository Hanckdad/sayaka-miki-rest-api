import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   MEDIAFIRE DOWNLOADER
   SCRAPE DATA (ASLI DARI FILE LU)
================================ */
async function mediafireDownloader(url) {
  try {
    if (!url) throw new Error("url is required")
    if (!url.includes("mediafire.com")) {
      throw new Error("invalid mediafire url")
    }

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)

    const title = $("div.filename").text().trim()
    const size = $("div.details").text().trim().split("•")[1]?.trim() || null
    const date = $("div.details").text().trim().split("•")[0]?.trim() || null
    const downloadLink = $("a#downloadButton").attr("href")

    if (!downloadLink) throw new Error("failed to get download link")

    return {
      status: "success",
      title,
      size,
      date,
      download: downloadLink,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

/* ===============================
   HANDLER UNTUK ROUTE /api/v1/mediafire
================================ */
export async function handler(query) {
  if (!query.url) {
    throw new Error("url is required")
  }

  return await mediafireDownloader(query.url)
}