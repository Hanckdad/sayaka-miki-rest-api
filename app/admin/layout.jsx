export default function AdminLayout({ children }) {
  return (
    <html>
      <body className="bg-zinc-950 text-white">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside className="w-64 border-r border-zinc-800 p-6">
            <h1 className="text-xl font-bold mb-8">
              API Admin
            </h1>

            <nav className="space-y-3 text-sm text-zinc-400">
              <a
                href="/admin"
                className="block hover:text-white"
              >
                Dashboard
              </a>
              <a
                href="/docs"
                className="block hover:text-white"
              >
                API Docs
              </a>
            </nav>
          </aside>

          {/* CONTENT */}
          <main className="flex-1 p-10 relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}