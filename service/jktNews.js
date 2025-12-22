import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   JKT NEWS SCRAPER
   AMBIL BERITA TERKINI
================================ */
async function jktNews() {
  try {
    const url = "https://jakarta.go.id/news"

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    })

    const $ = cheerio.load(data)
    const results = []

    $(".news-list .news-item").each((_, el) => {
      const title = $(el).find(".news-title").text().trim()
      const date = $(el).find(".news-date").text().trim()
      const link = $(el).find("a").attr("href")
      const thumbnail = $(el).find("img").attr("src")

      if (title && link) {
        results.push({
          title,
          date,
          link: link.startsWith("http")
            ? link
            : "https://jakarta.go.id" + link,
          thumbnail,
        })
      }
    })

    if (!results.length) {
      throw new Error("no news found")
    }

    return {
      source: "jakarta.go.id",
      total: results.length,
      news: results,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   HANDLER (WAJIB)
================================ */
export async function handler() {
  // jktNews tidak butuh query
  return await jktNews()
}