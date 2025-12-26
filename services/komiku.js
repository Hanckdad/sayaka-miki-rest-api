import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   KOMIKU SCRAPER
   SEARCH KOMIK
================================ */
async function komikuSearch(keyword) {
  try {
    if (!keyword) throw new Error("query is required")

    const url = `https://komiku.id/?s=${encodeURIComponent(keyword)}`

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".daftar .bge").each((_, el) => {
      const title = $(el).find(".kan h3").text().trim()
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("data-src") || $(el).find("img").attr("src")
      const type = $(el).find(".kan .ls2").text().trim() || null

      if (title && link) {
        results.push({
          title,
          type,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("comic not found")
    }

    return {
      source: "komiku.id",
      keyword,
      total: results.length,
      results,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   KOMIKU UPDATE TERBARU
================================ */
async function komikuLatest() {
  try {
    const url = "https://komiku.id/"

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".bge").each((_, el) => {
      const title = $(el).find(".kan h3").text().trim()
      const chapter = $(el).find(".kan .ls2").text().trim()
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("data-src") || $(el).find("img").attr("src")

      if (title && link) {
        results.push({
          title,
          chapter,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("no latest comic found")
    }

    return {
      source: "komiku.id",
      total: results.length,
      latest: results,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   HANDLER (WAJIB)
================================ */
export async function handler(query) {
  /**
   * MODE:
   * ?q=one piece → search komik
   * /komiku     → update terbaru
   */

  if (query.q) {
    return await komikuSearch(query.q)
  }

  return await komikuLatest()
}