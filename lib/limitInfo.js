import { tiers } from "./tier"
import { ipTier } from "./ipTier"

export function limitInfo(ip) {
  const tierName = ipTier[ip] || "free"
  return {
    tier: tierName,
    limit: tiers[tierName].limit
  }
}