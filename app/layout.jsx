import "./globals.css"
import Navbar from "@/components/Navbar"
import BannerPopup from "@/components/BannerPopup"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Sayaka Miki | Rest Api",
  description: "This rest api is free to use, use a limit so the server doesn't go down"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <BannerPopup />
        {children}
        <Footer />
      </body>
    </html>
  )
}