"use client"

import { useState } from "react"

const endpoints = [
  {
    name: "Downloader",
    path: "/api/v1/downloader",
    method: "POST",
    body: `{
  "type": "tiktok",
  "url": "https://..."
}`
  },
  {
    name: "Tools",
    path: "/api/v1/tools",
    method: "POST",
    body: `{
  "type": "base64",
  "text": "hello"
}`
  },
  {
    name: "Scraper",
    path: "/api/v1/scraper",
    method: "POST",
    body: `{
  "source": "google",
  "query": "openai"
}`
  },
  {
    name: "Anime",
    path: "/api/v1/anime",
    method: "POST",
    body: `{
  "source": "search",
  "query": "naruto"
}`
  },
  {
    name: "Info",
    path: "/api/v1/info",
    method: "POST",
    body: `{
  "type": "ping"
}`
  }
]

export default function DocsPage() {
  const [apiKey, setApiKey] = useState("")
  const [active, setActive] = useState(0)
  const [body, setBody] = useState(endpoints[0].body)
  const [log, setLog] = useState("")

  async function run() {
    setLog("Loading...")
    try {
      const res = await fetch(endpoints[active].path, {
        method: endpoints[active].method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body
      })

      const json = await res.json()
      setLog(JSON.stringify(json, null, 2))
    } catch (e) {
      setLog(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">API Documentation</h1>

      {/* API KEY */}
      <div className="mb-6">
        <input
          placeholder="Your API Key"
          className="w-full max-w-md p-2 rounded bg-zinc-900 border border-zinc-800"
          onChange={e => setApiKey(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SIDEBAR */}
        <aside className="space-y-2">
          {endpoints.map((ep, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i)
                setBody(ep.body)
                setLog("")
              }}
              className={`w-full text-left p-3 rounded ${
                active === i
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              {ep.name}
            </button>
          ))}
        </aside>

        {/* TRY IT */}
        <section className="md:col-span-2 space-y-4">
          <div className="text-sm text-zinc-400">
            <b>{endpoints[active].method}</b>{" "}
            {endpoints[active].path}
          </div>

          <textarea
            rows={8}
            className="w-full p-3 bg-zinc-900 rounded border border-zinc-800 font-mono text-sm"
            value={body}
            onChange={e => setBody(e.target.value)}
          />

          <button
            onClick={run}
            className="bg-white text-black px-6 py-2 rounded"
          >
            Try It
          </button>

          {/* RESPONSE */}
          <pre className="bg-black p-4 rounded border border-zinc-800 text-xs overflow-auto max-h-96">
{log}
          </pre>
        </section>
      </div>
    </div>
  )
}