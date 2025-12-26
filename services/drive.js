const axios = require("axios");

function extractFileId(url) {
  // format yang didukung:
  // https://drive.google.com/file/d/ID/view
  // https://drive.google.com/open?id=ID
  // https://drive.google.com/uc?id=ID
  // https://drive.google.com/uc?export=download&id=ID

  let id = null;

  if (url.includes("/file/d/")) {
    id = url.split("/file/d/")[1].split("/")[0];
  } else if (url.includes("id=")) {
    id = url.split("id=")[1].split("&")[0];
  }

  return id || null;
}

async function driveDownloader(url) {
  try {
    const fileId = extractFileId(url);
    if (!fileId) throw new Error("Invalid Google Drive URL");

    const api = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const { headers } = await axios.get(api, {
      maxRedirects: 0,
      validateStatus: s => s === 302 || s === 200
    });

    // File besar → Google kasih confirmation token
    const confirm = headers.location?.match(/confirm=([^&]+)/)?.[1];

    let downloadUrl;

    if (confirm) {
      downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}&confirm=${confirm}`;
    } else {
      downloadUrl = headers.location || api;
    }

    return {
      status: true,
      fileId,
      source: url,
      download: downloadUrl
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
}

module.exports = { driveDownloader };


// =============================
// 🔥 Handler API
// =============================
export async function handler(query) {
  if (!query.url) {
    throw new Error("url is required");
  }

  const result = await driveDownloader(query.url);
  return result;
}