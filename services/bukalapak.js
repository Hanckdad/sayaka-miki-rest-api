const axios = require("axios");
const cheerio = require("cheerio");


// ======================================
// 🔹 DETAIL PRODUK
// ======================================
async function bukalapakDetail(url) {
  try {
    if (!url.includes("bukalapak.com")) {
      throw new Error("invalid bukalapak url");
    }

    const { data } = await axios.get(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(data);

    const title = $("h1.c-main-product__title").text().trim();
    const price = $("span.c-main-product__price").text().trim();
    const store = $("a.c-main-product__store-name").text().trim();
    const rating =
      $("span.c-rating__number").text().trim() || null;

    const images = [];
    $("img.c-zoom-image__preview").each((_, el) => {
      const src = $(el).attr("src");
      if (src) images.push(src);
    });

    return {
      status: true,
      mode: "detail",
      url,
      title,
      price,
      store,
      rating,
      images
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}



// ======================================
// 🔹 SEARCH PRODUK
// ======================================
async function bukalapakSearch(q) {
  try {
    const url = `https://www.bukalapak.com/products?search%5Bkeywords%5D=${encodeURIComponent(
      q
    )}`;

    const { data } = await axios.get(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(data);
    const results = [];

    $("div.bl-product-card").each((_, el) => {
      const title = $(el).find("a.bl-product-card__description-name").text().trim();
      const price = $(el).find("p.bl-product-card__price").text().trim();
      const link = "https://www.bukalapak.com" + $(el).find("a").attr("href");
      const img = $(el).find("img").attr("src");

      results.push({ title, price, link, img });
    });

    return {
      status: true,
      mode: "search",
      query: q,
      results
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

module.exports = {
  bukalapakDetail,
  bukalapakSearch
};



// ======================================
// 🔥 HANDLER API
// ======================================
export async function handler(query) {
  if (!query.mode) {
    throw new Error("mode is required (detail|search)");
  }

  switch (query.mode) {
    case "detail":
      if (!query.url) throw new Error("url is required");
      return await bukalapakDetail(query.url);

    case "search":
      if (!query.q) throw new Error("q is required");
      return await bukalapakSearch(query.q);

    default:
      throw new Error("invalid mode");
  }
}