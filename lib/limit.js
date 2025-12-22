const memory = new Map()

export function rateLimit(ip, limit = 20, windowMs = 60_000) {
  const now = Date.now()
  const data = memory.get(ip) || { count: 0, time: now }

  if (now - data.time > windowMs) {
    memory.set(ip, { count: 1, time: now })
    return false
  }

  data.count++
  memory.set(ip, data)

  return data.count > limit
}