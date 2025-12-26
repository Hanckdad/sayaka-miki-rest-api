const axios = require("axios");
const cheerio = require("cheerio");

async function fbDownloader(url) {
  try {
    if (!url.includes("facebook.com") && !url.includes("fb.watch")) {
      throw new Error("invalid facebook url");
    }

    const api = "https://fdown.net/download.php";

    const { data } = await axios.post(
      api,
      new URLSearchParams({ URLz: url }).toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
      }
    );

    const $ = cheerio.load(data);
    const results = [];

    $("a[download]").each((_, el) => {
      results.push({
        quality: $(el).text().trim(),
        url: $(el).attr("href")
      });
    });

    return {
      status: true,
      source: url,
      results
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

module.exports = { fbDownloader };


// =============================
// 🔥 Handler API
// =============================
export async function handler(query) {
  if (!query.url) {
    throw new Error("url is required");
  }

  const result = await fbDownloader(query.url);
  return result;
}