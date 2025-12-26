import axios from "axios"

/* ===============================
   RANDOM HENTAI IMAGE
================================ */
async function randomHentai() {
  try {
    const { data } = await axios.get(
      "https://api.akuari.my.id/nsfw/hentai"
    )

    if (!data || !data.result || !data.result.url) {
      throw new Error("failed to fetch hentai image")
    }

    return {
      nsfw: true,
      category: "hentai",
      source: "akuari.my.id",
      image: data.result.url,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   HENTAI BY TAG / CATEGORY
================================ */
async function hentaiByTag(tag) {
  try {
    if (!tag) throw new Error("tag is required")

    const url = `https://api.akuari.my.id/nsfw/hentai/${encodeURIComponent(
      tag
    )}`

    const { data } = await axios.get(url)

    if (!data || !data.result || !data.result.url) {
      throw new Error("no result found for tag")
    }

    return {
      nsfw: true,
      category: tag,
      source: "akuari.my.id",
      image: data.result.url,
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
   * /hentai            → random hentai
   * /hentai?tag=ahegao → hentai by tag
   */

  if (query.tag) {
    return await hentaiByTag(query.tag)
  }

  return await randomHentai()
}