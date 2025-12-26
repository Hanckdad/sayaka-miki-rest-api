import axios from "axios"

/* ===============================
   SOUNDCLOUD RESOLVER
   (URL → TRACK INFO)
================================ */
async function resolveSoundCloud(url) {
  if (!url) throw new Error("url is required")

  const resolveApi =
    "https://api-v2.soundcloud.com/resolve"

  const clientId = "2t9loNQH90kzJcsFCODdigxfp325aq4z" // ASLI DI FILE LU

  const { data } = await axios.get(resolveApi, {
    params: {
      url,
      client_id: clientId,
    },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
    },
  })

  if (!data || !data.media) {
    throw new Error("failed resolve soundcloud")
  }

  return data
}

/* ===============================
   GET STREAM / DOWNLOAD
================================ */
async function getStream(track) {
  const clientId = "2t9loNQH90kzJcsFCODdigxfp325aq4z" // ASLI DI FILE LU

  const transcoding = track.media.transcodings.find(
    (v) => v.format.protocol === "progressive"
  )

  if (!transcoding) {
    throw new Error("no downloadable stream found")
  }

  const { data } = await axios.get(transcoding.url, {
    params: {
      client_id: clientId,
    },
  })

  if (!data || !data.url) {
    throw new Error("failed get stream url")
  }

  return data.url
}

/* ===============================
   MAIN FUNCTION (ASLI FLOW)
================================ */
async function soundcloudDownloader(url) {
  const track = await resolveSoundCloud(url)
  const streamUrl = await getStream(track)

  return {
    id: track.id,
    title: track.title,
    duration: track.duration,
    genre: track.genre,
    description: track.description,
    thumbnail:
      track.artwork_url?.replace("-large", "-t500x500") ||
      track.user.avatar_url,
    author: {
      id: track.user.id,
      username: track.user.username,
      profile: track.user.permalink_url,
      avatar: track.user.avatar_url,
    },
    audio: {
      url: streamUrl,
      mime: "audio/mpeg",
    },
  }
}

/* ===============================
   HANDLER (WAJIB)
================================ */
export async function handler(query) {
  /**
   * PARAM:
   * ?url=https://soundcloud.com/....
   */

  if (!query.url) {
    throw new Error("url is required")
  }

  return await soundcloudDownloader(query.url)
}