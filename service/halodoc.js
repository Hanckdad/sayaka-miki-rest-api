import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   HALODOC ARTICLE SCRAPER
   SEARCH BERDASARKAN KEYWORD
================================ */
async function halodocSearch(keyword) {
  try {
    if (!keyword) throw new Error("query is required")

    const url = `https://www.halodoc.com/artikel/search/${encodeURIComponent(
      keyword
    )}`

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $("a.article-card").each((_, el) => {
      const title = $(el).find("h3").text().trim()
      const excerpt = $(el).find("p").text().trim()
      const link =
        "https://www.halodoc.com" + $(el).attr("href")

      if (title && link) {
        results.push({
          title,
          excerpt,
          link,
        })
      }
    })

    if (!results.length) {
      throw new Error("no article found")
    }

    return {
      source: "halodoc.com",
      keyword,
      total: results.length,
      articles: results,
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
   * PARAM:
   * ?q=flu
   */

  if (!query.q) {
    throw new Error("parameter q is required")
  }

  return await halodocSearch(query.q)
}