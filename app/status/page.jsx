async function getHealth() {
  const res = await fetch("/api/health", { cache: "no-store" })
  return res.json()
}

export default async function StatusPage() {
  const health = await getHealth()

  return (
    <main className="px-10 py-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Status</h1>

      <div className="border border-zinc-800 p-4 rounded">
        <div className="flex justify-between">
          <span>Sayaka Miki | Rest Api</span>
          <span className="text-green-400">Online</span>
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          Last check: {new Date(health.time).toLocaleString()}
        </p>
      </div>
    </main>
  )
}