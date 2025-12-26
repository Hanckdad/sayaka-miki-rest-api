import axios from "axios"
import FormData from "form-data"

/* ===============================
   REMINI IMAGE ENHANCER
   ASLI DARI FILE LU (FLOW TETAP)
================================ */
async function reminiEnhance(imageUrl) {
  try {
    if (!imageUrl) throw new Error("image url required")

    // ambil image jadi buffer
    const img = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    })

    const form = new FormData()
    form.append("image", Buffer.from(img.data), {
      filename: "image.jpg",
    })

    const { data } = await axios.post(
      "https://api.remini.ai/api/v1/process",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
        },
        maxBodyLength: Infinity,
      }
    )

    if (!data || !data.result) {
      throw new Error("failed enhance image")
    }

    return {
      status: "success",
      original: imageUrl,
      enhanced: data.result,
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
   * ?url=https://....
   */

  if (!query.url) {
    throw new Error("url is required")
  }

  return await reminiEnhance(query.url)
}