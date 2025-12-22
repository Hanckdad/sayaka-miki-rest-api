import Link from "next/link"
import { Github, MessageCircle } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-zinc-800">
      <Link href="/" className="font-bold text-lg">
        Rest Api
      </Link>

      <div className="flex gap-4">
        <Link href="/docs" className="text-zinc-400 hover:text-white">
          Docs
        </Link>
        <a href="#" target="_blank">
          <Github />
        </a>
        <a href="#" target="_blank">
          <MessageCircle />
        </a>
      </div>
    </nav>
  )
}