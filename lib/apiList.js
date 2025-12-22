export const apiList = [

  // ======================
  // DOWNLOADER
  // ======================
  {
    name: "TikTok Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download video TikTok",
    body: { type: "tiktok", url: "https://tiktok.com/xxxx" }
  },
  {
    name: "Instagram Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download media Instagram",
    body: { type: "instagram", url: "https://instagram.com/p/xxxx" }
  },
  {
    name: "Facebook Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download video Facebook",
    body: { type: "fdown", url: "https://facebook.com/xxxx" }
  },
  {
    name: "YouTube Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download video YouTube",
    body: { type: "youtube", url: "https://youtube.com/watch?v=xxxx" }
  },
  {
    name: "Mediafire Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download file Mediafire",
    body: { type: "mediafire", url: "https://mediafire.com/xxxx" }
  },
  {
    name: "Google Drive Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download file Google Drive",
    body: { type: "drive", url: "https://drive.google.com/xxxx" }
  },
  {
    name: "SoundCloud Downloader",
    method: "POST",
    endpoint: "/api/v1/downloader",
    description: "Download audio SoundCloud",
    body: { type: "soundcloud", url: "https://soundcloud.com/xxxx" }
  },

  // ======================
  // IMAGE / MEDIA TOOLS
  // ======================
  {
    name: "Image Upscale",
    method: "POST",
    endpoint: "/api/v1/tools",
    description: "Upscale gambar",
    body: { type: "upscale", image: "https://example.com/img.jpg" }
  },
  {
    name: "Remini Enhance",
    method: "POST",
    endpoint: "/api/v1/tools",
    description: "Enhance foto (Remini)",
    body: { type: "remini", image: "https://example.com/img.jpg" }
  },
  {
    name: "Alight Motion Template",
    method: "POST",
    endpoint: "/api/v1/tools",
    description: "Cari template Alight Motion",
    body: { query: "beat sync" }
  },

  // ======================
  // AI & CHAT
  // ======================
  {
    name: "Simsimi Chat",
    method: "POST",
    endpoint: "/api/v1/ai",
    description: "Chat Simsimi",
    body: { text: "halo" }
  },

  // ======================
  // SCRAPER / SEARCH
  // ======================
  {
    name: "Pinterest Search",
    method: "POST",
    endpoint: "/api/v1/scraper",
    description: "Cari gambar Pinterest",
    body: { query: "anime girl" }
  },
  {
    name: "Playstore Search",
    method: "POST",
    endpoint: "/api/v1/scraper",
    description: "Cari aplikasi Playstore",
    body: { query: "whatsapp" }
  },
  {
    name: "Bukalapak Search",
    method: "POST",
    endpoint: "/api/v1/scraper",
    description: "Cari produk Bukalapak",
    body: { query: "ssd 1tb" }
  },
  {
    name: "Halodoc Search",
    method: "POST",
    endpoint: "/api/v1/scraper",
    description: "Cari info obat Halodoc",
    body: { query: "paracetamol" }
  },

  // ======================
  // ANIME & OTAKU
  // ======================
  {
    name: "Otakudesu",
    method: "POST",
    endpoint: "/api/v1/anime",
    description: "Info anime Otakudesu",
    body: { query: "one piece" }
  },
  {
    name: "Kusonime",
    method: "POST",
    endpoint: "/api/v1/anime",
    description: "Download anime Kusonime",
    body: { query: "naruto" }
  },
  {
    name: "Komiku",
    method: "POST",
    endpoint: "/api/v1/anime",
    description: "Cari manga Komiku",
    body: { query: "attack on titan" }
  },
  {
    name: "Quotes Anime",
    method: "POST",
    endpoint: "/api/v1/anime",
    description: "Quotes anime random",
    body: {}
  },

  // ======================
  // NEWS & INFO
  // ======================
  {
    name: "BMKG Info",
    method: "POST",
    endpoint: "/api/v1/info",
    description: "Info gempa / cuaca BMKG",
    body: {}
  },
  {
    name: "Jakarta News",
    method: "POST",
    endpoint: "/api/v1/info",
    description: "Berita Jakarta terbaru",
    body: {}
  },

  // ======================
  // FUN / RANDOM
  // ======================
  {
    name: "Free Fire Info",
    method: "POST",
    endpoint: "/api/v1/game",
    description: "Info Free Fire",
    body: { id: "123456" }
  },
  {
    name: "Blue Archive",
    method: "POST",
    endpoint: "/api/v1/game",
    description: "Info karakter Blue Archive",
    body: { query: "Hoshino" }
  },
  {
    name: "Lyrics Search",
    method: "POST",
    endpoint: "/api/v1/tools",
    description: "Cari lirik lagu",
    body: { query: "yellow coldplay" }
  }
]