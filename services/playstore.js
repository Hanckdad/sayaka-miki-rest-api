const axios = require("axios");
const cheerio = require("cheerio");

async function playStoreSearch(query) {
  try {
    const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`;
    const { data } = await axios.get(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(data);
    let results = [];

    $('div.VfPpkd-EScbFb-JIbuQc').each((i, el) => {
      const appName = $(el).find('div.wsVSpacer > div > div > div > span').text().trim();
      const dev = $(el).find('div.b8cIId.KoLSrc').text().trim();
      const icon = $(el).find('img.T75of').attr('src');
      const link = "https://play.google.com" + $(el).find('a.Si6A0c').attr('href');

      if (appName && link) {
        results.push({
          name: appName,
          developer: dev || null,
          icon,
          link
        });
      }
    });

    return {
      status: true,
      total: results.length,
      data: results
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

module.exports = { playStoreSearch };


// =============================
// 🔥 Handler API (DITAMBAHKAN)
// =============================
export async function handler(query) {
  if (!query.q) {
    throw new Error("q is required");
  }

  const result = await playStoreSearch(query.q);
  return result;
}