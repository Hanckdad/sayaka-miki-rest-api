import axios from "axios"

/* ===============================
   BLUE ARCHIVE — CHARACTER SEARCH
================================ */
async function searchStudent(keyword) {
  try {
    if (!keyword) throw new Error("q is required")

    const url = `https://api.akuari.my.id/game/bluearchive?query=${encodeURIComponent(
      keyword
    )}`

    const { data } = await axios.get(url)

    if (!data || !data.result) {
      throw new Error("student not found")
    }

    return {
      source: "bluearchive",
      query: keyword,
      name: data.result.name || null,
      school: data.result.school || null,
      role: data.result.role || null,
      rarity: data.result.rarity || null,
      weapon: data.result.weapon || null,
      portrait: data.result.image || null,
      raw: data.result,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   BLUE ARCHIVE — RANDOM STUDENT
================================ */
async function randomStudent() {
  try {
    const { data } = await axios.get(
      "https://api.akuari.my.id/game/bluearchive/random"
    )

    if (!data || !data.result) {
      throw new Error("failed to fetch random character")
    }

    return {
      source: "bluearchive",
      name: data.result.name,
      school: data.result.school,
      role: data.result.role,
      rarity: data.result.rarity,
      weapon: data.result.weapon,
      portrait: data.result.image,
      raw: data.result,
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
   * /bluearchive?q=arin   → search student
   * /bluearchive          → random student
   */

  if (query.q) {
    return await searchStudent(query.q)
  }

  return await randomStudent()
}