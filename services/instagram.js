import axios from "axios"

/* ===============================
   INSTAGRAM DOWNLOADER
================================ */
async function instagramDownloader(url) {
  try {
    if (!url.includes("instagram.com")) {
      throw new Error("invalid instagram url")
    }

    const api = "https://snapinsta.app/action.php"

    const { data } = await axios.post(
      api,
      new URLSearchParams({
        url,
        action: "post",
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        },
      }
    )

    if (!data || !data.medias) {
      throw new Error("failed fetch instagram media")
    }

    return {
      type: data.type,
      caption: data.caption || null,
      medias: data.medias.map((v) => ({
        url: v.url,
        quality: v.quality || null,
        type: v.type,
      })),
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

/* ===============================
   HANDLER
================================ */
export async function handler(query) {
  if (!query.url) {
    throw new Error("url is required")
  }

  return await instagramDownloader(query.url)
}