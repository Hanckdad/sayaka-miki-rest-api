"use client"

import { useEffect, useState } from "react"

const LIMIT = {
  free: 50,
  pro: 500,
  premium: 5000
}

export default function AdminDashboard() {
  const [stats, setStats] = useState([])
  const [tier, setTier] = useState("free")
  const [newKey, setNewKey] = useState(null)
  const [loading, setLoading] = useState(false)

  async function loadStats() {
    const res = await fetch("/api/admin/stats")
    const json = await res.json()
    setStats(json.data || [])
  }

  async function createKey() {
    setLoading(true)
    const res = await fetch("/api/admin/apikey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier })
    })
    const json = await res.json()
    setNewKey(json.apikey)
    setLoading(false)
    loadStats()
  }

  async function deleteKey(key) {
    if (!confirm("Hapus API key ini?")) return
    await fetch("/api/admin/apikey", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key })
    })
    loadStats()
  }

  useEffect(() => {
    loadStats()
  }, [])

  return (
    <div>
      {/* LOGOUT */}
      <button
        onClick={async () => {
          await fetch("/api/admin/logout", { method: "POST" })
          location.href = "/admin/login"
        }}
        className="absolute top-6 right-10 text-sm text-red-400"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* CREATE API KEY */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-10">
        <h2 className="font-semibold mb-4">
          Generate API Key
        </h2>

        <div className="flex items-center gap-4">
          <select
            value={tier}
            onChange={e => setTier(e.target.value)}
            className="bg-zinc-800 p-2 rounded"
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>

          <button
            onClick={createKey}
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {newKey && (
          <div className="mt-4 text-sm">
            <div className="text-zinc-400 mb-1">
              New API Key
            </div>
            <code className="block bg-black p-3 rounded break-all">
              {newKey}
            </code>
          </div>
        )}
      </div>

      {/* USAGE LIST */}
      <div className="grid gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="border border-zinc-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start gap-4">
              <code className="text-xs break-all">
                {item.key}
              </code>

              <button
                onClick={() => deleteKey(item.key)}
                className="text-xs text-red-400"
              >
                Delete
              </button>
            </div>

            <div className="mt-2 text-sm text-zinc-400">
              Total Requests: {item.total}
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              Limit: {LIMIT[item.tier || "free"]}/minute
            </div>

            <div className="mt-3 space-y-1 text-xs text-zinc-500">
              {Object.entries(item.endpoints).map(([ep, c]) => (
                <div
                  key={ep}
                  className="flex justify-between"
                >
                  <span>{ep}</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}