"use client"
import { useState, useEffect } from "react"

export default function BannerPopup() {
  const [show, setShow] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const closed = localStorage.getItem("promo_closed")
    if (!closed) {
      // Delay sedikit untuk efek animasi
      setTimeout(() => setShow(true), 500)
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem("promo_closed", "1")
      setShow(false)
    }, 300)
  }

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background dengan efek blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-black/90 backdrop-blur-sm"></div>
      
      {/* Banner utama */}
      <div className={`relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-gray-900 p-6 md:p-8 rounded-2xl w-[90%] max-w-lg border border-purple-500/30 shadow-2xl transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Efek cahaya di pojok */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        {/* Tombol close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white hover:bg-zinc-800 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 z-10"
          aria-label="Tutup promo"
        >
          <span className="text-xl font-bold">✕</span>
        </button>

        {/* Icon dekoratif */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">✨</span>
          </div>
        </div>

        {/* Konten utama */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6 mt-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              🚀 PROMO SCRIPT BOT SAYAKA MIKI
            </h1>
            <p className="text-lg text-zinc-300 font-medium">Multi Platform V1</p>
          </div>

          {/* Harga promo */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-5 mb-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">Rp 70,000</div>
                <div className="text-sm text-zinc-300">Harga Promo</div>
              </div>
              
              <div className="hidden md:block text-2xl text-zinc-500">→</div>
              
              <div className="text-center relative">
                <div className="text-2xl font-bold text-zinc-400 line-through">Rp 100,000</div>
                <div className="text-sm text-zinc-400">Harga Asli</div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 transform -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="inline-block bg-gradient-to-r from-purple-700 to-pink-700 text-white text-sm font-bold px-4 py-1.5 rounded-full">
              🔥 Hemat 30% 🔥
            </div>
          </div>

          {/* Fitur */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">✅ Fitur Unggulan:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-zinc-300">Multi Platform Support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-zinc-300">Unlimited Endpoint Access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-zinc-300">Tanpa API Key Required</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-zinc-300">Fast Response & Support</span>
              </li>
            </ul>
          </div>

          {/* Tombol aksi */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/order"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl text-center hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
            >
              🛒 Pesan Sekarang
            </a>
            <a
              href="/docs"
              className="flex-1 bg-zinc-800 text-zinc-300 font-medium py-3 px-6 rounded-xl text-center hover:bg-zinc-700 transition-colors duration-200 border border-zinc-700"
            >
              📖 Lihat Dokumentasi
            </a>
          </div>
          
          {/* Catatan kecil */}
          <p className="text-xs text-center text-zinc-500 mt-5">
            Promo berlaku untuk pelanggan baru
          </p>
        </div>
      </div>
    </div>
  )
}