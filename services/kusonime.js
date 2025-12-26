import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   KUSONIME — SEARCH ANIME
================================ */
async function kusonimeSearch(keyword) {
  try {
    if (!keyword) throw new Error("query is required")

    const url = `https://kusonime.com/?s=${encodeURIComponent(keyword)}`

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".terbaru .kover").each((_, el) => {
      const title = $(el).find("h2.jdlflm").text().trim()
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("src")
      const genre = $(el).find(".set").text().trim() || null

      if (title && link) {
        results.push({
          title,
          genre,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("anime not found")
    }

    return {
      source: "kusonime.com",
      keyword,
      total: results.length,
      results,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   KUSONIME — UPDATE TERBARU
================================ */
async function kusonimeLatest() {
  try {
    const url = "https://kusonime.com/"

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".terbaru .kover").each((_, el) => {
      const title = $(el).find("h2.jdlflm").text().trim()
      const episode = $(el).find(".epz").text().trim() || null
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("src")

      if (title && link) {
        results.push({
          title,
          episode,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("no latest anime found")
    }

    return {
      source: "kusonime.com",
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
   * ?q=naruto → search
   * /kusonime → latest update
   */

  if (query.q) {
    return await kusonimeSearch(query.q)
  }

  return await kusonimeLatest()
}