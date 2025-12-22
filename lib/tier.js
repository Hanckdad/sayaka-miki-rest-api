export const tiers = {
  free: {
    limit: 20,
    window: 60_000
  },
  pro: {
    limit: 120,
    window: 60_000
  },
  premium: {
    limit: Infinity,
    window: 0
  }
}