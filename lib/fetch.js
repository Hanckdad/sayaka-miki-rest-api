export async function http(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 API Service",
      ...options.headers
    },
    ...options
  })

  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}