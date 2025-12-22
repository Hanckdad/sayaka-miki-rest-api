import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-4xl font-bold mb-4">
          Api Service
        </h1>
        <p className="text-zinc-400 mb-8">
          Ready to use REST API for WhatsApp & Telegram Bots.
          Fast, clean, and easy to integrate.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/docs"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium"
          >
            API Docs
          </Link>
          <a
            href="#"
            className="px-6 py-3 border border-zinc-700 rounded-lg"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}