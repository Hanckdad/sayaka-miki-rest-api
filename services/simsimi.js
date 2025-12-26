const axios = require("axios");

async function simiChat(text, lang = "id") {
  try {
    const url = `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=${lang}`;

    const { data } = await axios.get(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    return {
      status: true,
      question: text,
      answer: data.success || data.message || null,
      language: lang
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

module.exports = { simiChat };


// =============================
// 🔥 Handler API (DITAMBAHKAN)
// =============================
export async function handler(query) {
  if (!query.text) {
    throw new Error("text is required");
  }

  const lang = query.lang || "id";

  const result = await simiChat(query.text, lang);
  return result;
}