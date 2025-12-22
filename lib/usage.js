const logs = new Map()

export function logUsage(key, endpoint) {
  const data = logs.get(key) || { total: 0, endpoints: {} }

  data.total++
  data.endpoints[endpoint] =
    (data.endpoints[endpoint] || 0) + 1

  logs.set(key, data)
}

export function getUsage() {
  return Array.from(logs.entries()).map(([key, v]) => ({
    key,
    total: v.total,
    endpoints: v.endpoints
  }))
}