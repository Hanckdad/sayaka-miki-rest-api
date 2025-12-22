import axios from "axios"

/* ===============================
   SEARCH TIKTOK VIDEO
================================ */
async function tiktokSearchVideo(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios("https://tikwm.com/api/feed/search", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: {
          keywords: query,
          count: 12,
          cursor: 0,
          web: 1,
          hd: 1,
        },
      })

      resolve(data.data)
    } catch (e) {
      reject(e)
    }
  })
}

/* ===============================
   DOWNLOAD TIKTOK VIDEO
================================ */
async function tiktokDownloaderVideo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      function formatNumber(integer) {
        return Number(parseInt(integer)).toLocaleString().replace(/,/g, ".")
      }

      function formatDate(n, locale = "en") {
        const d = new Date(n)
        return d.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      }

      const id = url.match(/\/(\d+)/)?.[1]
      if (!id) return reject("Invalid TikTok URL")

      const { data } = await axios(`https://tikwm.com/api/?url=${url}&hd=1`)

      if (!data || !data.data) return reject("Failed to fetch video")

      const res = data.data

      resolve({
        id: res.id,
        title: res.title,
        region: res.region,
        duration: res.duration,
        create_time: formatDate(res.create_time * 1000),
        stats: {
          views: formatNumber(res.play_count),
          likes: formatNumber(res.digg_count),
          comments: formatNumber(res.comment_count),
          shares: formatNumber(res.share_count),
        },
        author: {
          id: res.author.id,
          username: res.author.unique_id,
          nickname: res.author.nickname,
          avatar: res.author.avatar,
        },
        video: {
          nowm: res.play,
          wm: res.wmplay,
          hd: res.hdplay,
        },
        music: {
          title: res.music_info.title,
          author: res.music_info.author,
          play: res.music,
        },
      })
    } catch (e) {
      reject(e)
    }
  })
}

/* ===============================
   UNIVERSAL HANDLER (WAJIB)
================================ */
export async function handler(query) {
  /**
   * MODE:
   * - ?url=xxxx  → download
   * - ?search=xxx → search
   */

  if (query.url) {
    return await tiktokDownloaderVideo(query.url)
  }

  if (query.search) {
    return await tiktokSearchVideo(query.search)
  }

  throw new Error("parameter url atau search wajib diisi")
}