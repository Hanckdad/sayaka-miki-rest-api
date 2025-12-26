import axios from "axios"

/* ===============================
   RANDOM ANIME QUOTES
================================ */
async function randomQuote() {
  try {
    const { data } = await axios.get(
      "https://animechan.xyz/api/random"
    )

    if (!data || !data.quote) {
      throw new Error("failed to fetch quote")
    }

    return {
      source: "animechan.xyz",
      anime: data.anime || null,
      character: data.character || null,
      quote: data.quote,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   SEARCH QUOTES BY CHARACTER / ANIME
================================ */
async function searchQuote(keyword) {
  try {
    if (!keyword) throw new Error("q is required")

    const url = `https://animechan.xyz/api/quotes?title=${encodeURIComponent(
      keyword
    )}`

    const { data } = await axios.get(url)

    if (!data || !Array.isArray(data) || !data.length) {
      throw new Error("quote not found")
    }

    return {
      source: "animechan.xyz",
      keyword,
      total: data.length,
      results: data.map(q => ({
        anime: q.anime,
        character: q.character,
        quote: q.quote,
      })),
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
   * /quotesanime        → random quote
   * /quotesanime?q=naruto → search quote
   */

  if (query.q) {
    return await searchQuote(query.q)
  }

  return await randomQuote()
}