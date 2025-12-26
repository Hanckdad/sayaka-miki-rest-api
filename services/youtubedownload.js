import axios from "axios"

/* ===============================
   YOUTUBE DOWNLOAD
================================ */
async function youtubeDownloader(url) {
  try {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      throw new Error("invalid youtube url")
    }

    const api = "https://yt1s.com/api/ajaxSearch/index"

    const search = await axios.post(
      api,
      new URLSearchParams({
        q: url,
        vt: "home",
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
        },
      }
    )

    if (!search.data || !search.data.links) {
      throw new Error("failed get youtube data")
    }

    const video = search.data.links.mp4
    const audio = search.data.links.mp3

    return {
      title: search.data.title,
      thumbnail: search.data.thumb,
      duration: search.data.t,
      video: Object.values(video).map((v) => ({
        quality: v.k,
        size: v.size,
        url: v.url,
      })),
      audio: Object.values(audio).map((v) => ({
        quality: v.k,
        size: v.size,
        url: v.url,
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

  return await youtubeDownloader(query.url)
}