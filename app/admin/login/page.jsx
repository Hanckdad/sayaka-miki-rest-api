"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function login() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password })
    })

    if (res.ok) router.push("/admin")
    else alert("Password salah")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 p-6 rounded-xl w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          placeholder="Admin password"
          className="w-full p-2 rounded bg-zinc-800 mb-4"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="w-full bg-white text-black py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}