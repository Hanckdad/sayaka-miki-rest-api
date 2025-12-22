import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   OTAKUDESU SCRAPER
   SEARCH / UPDATE ANIME
================================ */
async function otakudesuSearch(keyword) {
  try {
    if (!keyword) throw new Error("query is required")

    const url = `https://otakudesu.cloud/?s=${encodeURIComponent(keyword)}&post_type=anime`

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".chivsrc li").each((_, el) => {
      const title = $(el).find("h2 a").text().trim()
      const link = $(el).find("h2 a").attr("href")
      const thumbnail = $(el).find("img").attr("src")
      const status = $(el).find(".set").text().trim() || null

      if (title && link) {
        results.push({
          title,
          status,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("anime not found")
    }

    return {
      source: "otakudesu.cloud",
      keyword,
      total: results.length,
      results,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   OTAKUDESU UPDATE TERBARU
================================ */
async function otakudesuUpdate() {
  try {
    const url = "https://otakudesu.cloud/ongoing-anime"

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".venz ul li").each((_, el) => {
      const title = $(el).find(".jdlflm").text().trim()
      const episode = $(el).find(".epz").text().trim()
      const day = $(el).find(".epztipe").text().trim()
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("src")

      if (title && link) {
        results.push({
          title,
          episode,
          day,
          link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("no update found")
    }

    return {
      source: "otakudesu.cloud",
      total: results.length,
      update: results,
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
   * ?q=naruto  → search anime
   * /otakudesu → update terbaru
   */

  if (query.q) {
    return await otakudesuSearch(query.q)
  }

  return await otakudesuUpdate()
}