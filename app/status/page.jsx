export default function StatusPage() {
  return (
    <main className="px-10 py-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Status</h1>

      <div className="space-y-4">
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <span>Downloader</span>
          <span className="text-green-400">Online</span>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <span>Scraper</span>
          <span className="text-green-400">Online</span>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <span>Anime</span>
          <span className="text-green-400">Online</span>
        </div>
      </div>
    </main>
  )
}