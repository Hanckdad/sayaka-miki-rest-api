const LIMIT = {
  free: 50,
  pro: 500,
  premium: 5000
}

const usage = new Map()

export function rateLimit(key, tier) {
  const now = Date.now()
  const data = usage.get(key) || { count: 0, time: now }

  if (now - data.time > 60_000) {
    data.count = 0
    data.time = now
  }

  data.count++
  usage.set(key, data)

  return data.count > LIMIT[tier]
}