const store = new Map()

export function getCache(key) {
  const data = store.get(key)
  if (!data) return null

  if (Date.now() > data.exp) {
    store.delete(key)
    return null
  }

  return data.value
}

export function setCache(key, value, ttl = 60_000) {
  store.set(key, {
    value,
    exp: Date.now() + ttl
  })
}