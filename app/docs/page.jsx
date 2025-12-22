"use client"

import { useState } from "react"
import { apiList } from "@/lib/apiList"

export default function DocsPage() {
  const [logs, setLogs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(null)

  const tryApi = async (api, index) => {
    setActive(index)
    setLoading(true)
    setLogs(null)

    const res = await fetch("/api/try", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        endpoint: api.endpoint,
        method: api.method,
        body: api.body
      })
    })

    const data = await res.json()
    setLogs(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen px-10 py-10">
      <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
      <p className="text-zinc-400 mb-8">
    All endpoints below can be tried directly (Try API)
      </p>

      <div className="space-y-6">
        {apiList.map((api, i) => (
          <div
            key={i}
            className="border border-zinc-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{api.name}</h2>
                <p className="text-sm text-zinc-400">
                  {api.method} {api.endpoint}
                </p>
              </div>

              <button
                onClick={() => tryApi(api, i)}
                className="px-4 py-2 bg-white text-black rounded"
              >
                {loading && active === i ? "Running..." : "Try API"}
              </button>
            </div>

            {api.description && (
              <p className="text-sm text-zinc-500 mt-2">
                {api.description}
              </p>
            )}

            {api.body && (
              <pre className="bg-zinc-900 p-3 mt-3 text-sm rounded overflow-x-auto">
{JSON.stringify(api.body, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>

      {logs && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-3">Logs Output</h3>
          <pre className="bg-zinc-900 p-4 rounded text-sm overflow-x-auto">
{JSON.stringify(logs, null, 2)}
          </pre>
        </div>
      )}
    </main>
  )
}