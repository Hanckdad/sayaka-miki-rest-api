const axios = require("axios");
const cheerio = require("cheerio");


// ======================================
// 🔹 SEARCH PINTEREST IMAGE
// ======================================
async function pinterestSearch(q) {
  const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(
    q
  )}`;

  const { data } = await axios.get(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const results = [];
  const regex = /"url":"(https:\/\/i\.pinimg\.com\/[^"]+)"/g;
  let match;

  while ((match = regex.exec(data)) !== null) {
    results.push(match[1].replace(/\\u0026/g, "&"));
  }

  return {
    status: true,
    mode: "search",
    query: q,
    results
  };
}



// ======================================
// 🔹 PIN DETAIL + DIRECT IMAGE
// ======================================
async function pinterestDetail(url) {
  if (!url.includes("pinterest")) {
    throw new Error("invalid pinterest url");
  }

  const { data } = await axios.get(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
  });

  const $ = cheerio.load(data);

  let title = $("title").text().trim();
  let image = null;

  const regex = /"url":"(https:\/\/i\.pinimg\.com\/[^"]+)"/g;
  const match = regex.exec(data);

  if (match) {
    image = match[1].replace(/\\u0026/g, "&");
  }

  return {
    status: true,
    mode: "detail",
    url,
    title,
    image
  };
}

module.exports = {
  pinterestSearch,
  pinterestDetail
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
      return await pinterestSearch(query.q);

    case "detail":
      if (!query.url) throw new Error("url is required");
      return await pinterestDetail(query.url);

    default:
      throw new Error("invalid mode");
  }
}