import { tiers } from "./tier"
import { ipTier } from "./ipTier"

const store = new Map()

export function rateLimit(ip) {
  const tierName = ipTier[ip] || "free"
  const tier = tiers[tierName]

  if (tier.limit === Infinity) return false

  const now = Date.now()
  const data = store.get(ip) || { count: 0, time: now }

  if (now - data.time > tier.window) {
    store.set(ip, { count: 1, time: now })
    return false
  }

  data.count++
  store.set(ip, data)

  return data.count > tier.limit
}