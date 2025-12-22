import axios from "axios"
import FormData from "form-data"

/* ===============================
   IMAGE UPSCALE
   LOGIC ASLI (UPLOAD → PROCESS → RESULT)
================================ */
async function upscaleImage(imageUrl) {
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
    form.append("scale", "2")

    const { data } = await axios.post(
      "https://api.deepai.org/api/torch-srgan",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "api-key": "quickstart-xxxxxxxx", // ASLI DI FILE LU
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
        },
        maxBodyLength: Infinity,
      }
    )

    if (!data || !data.output_url) {
      throw new Error("failed upscale image")
    }

    return {
      status: "success",
      original: imageUrl,
      upscaled: data.output_url,
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   HANDLER (WAJIB BUAT API ROUTE)
================================ */
export async function handler(query) {
  /**
   * PARAM:
   * ?url=https://....
   */

  if (!query.url) {
    throw new Error("url is required")
  }

  return await upscaleImage(query.url)
}