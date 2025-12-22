"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full px-10 py-4 border-b border-zinc-800 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        Sayaka Miki | Rest Api
      </Link>

      <div className="flex gap-6 text-sm text-zinc-400">
        <Link href="/docs">Docs</Link>
        <Link href="/status">Status</Link>
        <a href="https://github.com/Hanckdad" target="_blank">GitHub</a>
        <a href="https://wa.me/62895406178006" target="_blank">WhatsApp</a>
        <a href="https://whatsapp.com/channel/0029VbBUzaSDzgTKNFvrCn44" target="_blank">
          WA Channel
        </a>
      </div>
    </nav>
  )
}