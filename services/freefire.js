import axios from "axios"

/* ===============================
   FREE FIRE ID CHECKER
   (NICKNAME LOOKUP)
================================ */
async function lookupFF(id) {
  try {
    if (!id) throw new Error("id is required")

    const url = `https://api.akuari.my.id/game/freefire?id=${encodeURIComponent(id)}`

    const { data } = await axios.get(url)

    if (!data || !data.result || !data.result.nickname) {
      throw new Error("player not found")
    }

    return {
      source: "freefire.garena",
      id,
      nickname: data.result.nickname,
      region: data.result.region || null,
      raw: data.result,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   FREE FIRE DIAMOND PRICE (LIST)
================================ */
async function diamondList() {
  try {
    const { data } = await axios.get(
      "https://api.akuari.my.id/game/freefire/diamond"
    )

    if (!data || !data.result) {
      throw new Error("failed to fetch diamond list")
    }

    return {
      source: "freefire.topup",
      total: data.result.length,
      diamonds: data.result,
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
   * /freefire?id=123456789  → lookup user
   * /freefire               → diamond list
   */

  if (query.id) {
    return await lookupFF(query.id)
  }

  return await diamondList()
}