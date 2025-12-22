export default function DocsPage() {
  return (
    <main className="min-h-screen px-10 py-10">
      <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
      <p className="text-zinc-400 mb-8">
        Bot REST API endpoint documentation.
The endpoint can be tested immediately (Try API).
      </p>

      <div className="border border-zinc-800 rounded-lg p-6">
        <p className="text-zinc-500">
        The endpoint list will appear here
        </p>
      </div>
    </main>
  )
}