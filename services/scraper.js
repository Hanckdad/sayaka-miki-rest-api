const axios = require("axios");
const cheerio = require("cheerio");


// =========================
// 🔹 WALLPAPER SCRAPER
// =========================
async function wallpaperSearch(query) {
  const url = `https://wall.alphacoders.com/search.php?search=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const results = [];

  $("img.thumb").each((_, el) => {
    const src = $(el).attr("data-src") || $(el).attr("src");
    if (src) results.push(src);
  });

  return {
    status: true,
    query,
    results
  };
}



// =========================
// 🔹 WIKIMEDIA SCRAPER
// =========================
async function wikimediaSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrlimit=10&prop=imageinfo&iiprop=url&format=json`;

  const { data } = await axios.get(api);

  const results = Object.values(data?.query?.pages || {}).map(v => ({
    title: v.title,
    url: v.imageinfo?.[0]?.url || null
  }));

  return {
    status: true,
    query,
    results
  };
}



// =========================
// 🔹 HAPPYMOD SCRAPER
// =========================
async function happyModSearch(q) {
  const url = `https://happymod.com/search.html?q=${encodeURIComponent(q)}`;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const results = [];

  $(".game-info").each((_, el) => {
    results.push({
      title: $(el).find("h3").text().trim(),
      link: "https://happymod.com" + $(el).find("a").attr("href"),
      thumb: $(el).find("img").attr("data-original")
    });
  });

  return { status: true, query: q, results };
}



// =========================
// 🔹 RINGTONE SCRAPER
// =========================
async function ringtoneSearch(q) {
  const url = `https://www.zedge.net/find/ringtone/${encodeURIComponent(q)}`;
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const results = [];

  $("audio").each((_, el) => {
    results.push($(el).attr("src"));
  });

  return { status: true, query: q, results };
}



// =========================
// 🔹 UMMA QURAN SEARCH
// =========================
async function ummaSearch(q) {
  const api = `https://api.umma.id/v1/search?q=${encodeURIComponent(q)}`;
  const { data } = await axios.get(api);

  return {
    status: true,
    query: q,
    results: data?.data || []
  };
}



// =========================
// 🔹 GITHUB STALK
// =========================
async function githubStalk(username) {
  const url = `https://api.github.com/users/${username}`;
  const { data } = await axios.get(url);

  return {
    status: true,
    username,
    profile: {
      name: data.name,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      repos: data.public_repos,
      avatar: data.avatar_url,
      url: data.html_url
    }
  };
}



// =========================
// 🔹 NPM STALK
// =========================
async function npmStalk(pkg) {
  const url = `https://registry.npmjs.org/${pkg}`;
  const { data } = await axios.get(url);

  return {
    status: true,
    package: pkg,
    latest: data["dist-tags"].latest,
    version: data.versions[data["dist-tags"].latest],
    time: data.time
  };
}



// =========================
// 🔹 ML STALK (Mobile Legends User Search)
// =========================
// *sesuai struktur file aslinya — tetap simple*
async function mlStalk(id, zone) {
  return {
    status: true,
    id,
    zone,
    message: "ML stalk real service harus dihubungkan ke API pihak ketiga"
  };
}



// =====================================================
// 🔥 HANDLER UTAMA (ROUTER BERDASARKAN `action`)
// =====================================================
export async function handler(query) {
  if (!query.action) {
    throw new Error("action is required");
  }

  const { action } = query;

  switch (action) {

    case "wallpaper":
      if (!query.q) throw new Error("q is required");
      return await wallpaperSearch(query.q);

    case "wikimedia":
      if (!query.q) throw new Error("q is required");
      return await wikimediaSearch(query.q);

    case "happymod":
      if (!query.q) throw new Error("q is required");
      return await happyModSearch(query.q);

    case "ringtone":
      if (!query.q) throw new Error("q is required");
      return await ringtoneSearch(query.q);

    case "umma":
      if (!query.q) throw new Error("q is required");
      return await ummaSearch(query.q);

    case "githubstalk":
      if (!query.username) throw new Error("username is required");
      return await githubStalk(query.username);

    case "npmstalk":
      if (!query.pkg) throw new Error("pkg is required");
      return await npmStalk(query.pkg);

    case "mlstalk":
      if (!query.id || !query.zone)
        throw new Error("id & zone required");
      return await mlStalk(query.id, query.zone);

    default:
      throw new Error("unknown action");
  }
}