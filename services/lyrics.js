import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   LYRICS SEARCH (GENIUS ALT SCRAPER)
================================ */
async function searchLyrics(query) {
  try {
    if (!query) throw new Error("query is required")

    const url = `https://api.akuari.my.id/search/lirik?query=${encodeURIComponent(query)}`

    const { data } = await axios.get(url)

    if (!data || !data.result) {
      throw new Error("lyrics not found")
    }

    return {
      source: "akuari.my.id",
      query,
      title: data.result.judul || null,
      artist: data.result.penanyi || null,
      lyrics: data.result.lirik || null,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   LYRICS SCRAPER (BACKUP PARSER)
================================ */
async function scrapeLyrics(keyword) {
  try {
    const url = `https://www.lyrics.com/serp.php?st=${encodeURIComponent(keyword)}`

    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const first = $(".sec-lyric").first()

    const title = first.find(".lyric-meta-title").text().trim()
    const artist = first.find(".lyric-meta-artists").text().trim()
    const link = "https://www.lyrics.com" + first.find("a").attr("href")

    if (!link) throw new Error("lyrics not found")

    const { data: page } = await axios.get(link)
    const $$ = cheerio.load(page)

    const lyrics = $$("#lyric-body-text").text().trim()

    return {
      source: "lyrics.com",
      title,
      artist,
      lyrics,
      link,
    }
  } catch {
    throw new Error("failed to fetch lyrics")
  }
}

/* ===============================
   HANDLER (WAJIB)
================================ */
export async function handler(query) {
  /**
   * MODE:
   * ?q=let her go → search lyrics
   */

  if (!query.q) {
    throw new Error("q is required")
  }

  // primary API
  try {
    return await searchLyrics(query.q)
  } catch {
    // fallback scraper
    return await scrapeLyrics(query.q)
  }
}