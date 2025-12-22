export default function Home() {
  return (
    <main className="px-10 py-20 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-6">
        API Service for Bot Developer
      </h1>

      <p className="text-zinc-400 mb-10">
        Downloader, Scraper, Anime, AI, Tools — satu API untuk semua bot.
      </p>

      <div className="flex gap-4">
        <a
          href="/docs"
          className="bg-white text-black px-6 py-3 rounded"
        >
          API Docs
        </a>
        <a
          href="/status"
          className="border border-zinc-700 px-6 py-3 rounded"
        >
          Status API
        </a>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-16 text-sm text-zinc-400">
        <div>⚡ Fast & Lightweight</div>
        <div>🔓 No API Key</div>
        <div>📦 Bot Ready</div>
        <div>🧩 Modular Service</div>
      </div>
    </main>
  )
}