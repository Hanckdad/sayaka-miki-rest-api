const axios = require("axios");
const cheerio = require("cheerio");


// ======================================
// 🔹 ALIGHT MOTION PRESET SCRAPER
// ======================================
async function alightMotionSearch(q) {
  const url = `https://alightmotion.net/?s=${encodeURIComponent(q)}`;

  const { data } = await axios.get(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const $ = cheerio.load(data);
  const results = [];

  $("article").each((_, el) => {
    const title = $(el).find("h2 a").text().trim();
    const link = $(el).find("h2 a").attr("href");
    const thumb = $(el).find("img").attr("src");

    results.push({ title, link, thumb });
  });

  return {
    status: true,
    mode: "search",
    query: q,
    results
  };
}



// ======================================
// 🔹 GET PRESET DETAIL + DOWNLOAD
// ======================================
async function alightMotionDetail(url) {
  const { data } = await axios.get(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const $ = cheerio.load(data);

  const title = $("h1").text().trim();
  const desc = $("article p").first().text().trim();

  let download = null;

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("alight.link")) {
      download = href;
    }
  });

  const images = [];
  $("article img").each((_, el) => {
    const src = $(el).attr("src");
    if (src) images.push(src);
  });

  return {
    status: true,
    mode: "detail",
    url,
    title,
    description: desc,
    download,
    images
  };
}

module.exports = {
  alightMotionSearch,
  alightMotionDetail
};



// ======================================
// 🔥 HANDLER API
// ======================================
export async function handler(query) {
  if (!query.mode) {
    throw new Error("mode is required (search|detail)");
  }

  switch (query.mode) {
    case "search":
      if (!query.q) throw new Error("q is required");
      return await alightMotionSearch(query.q);

    case "detail":
      if (!query.url) throw new Error("url is required");
      return await alightMotionDetail(query.url);

    default:
      throw new Error("invalid mode");
  }
}