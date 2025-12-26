const cheerio = require("cheerio");
const axios = require('axios');

async function savePin(url) {
	try {
		const response = await axios.get(`https://www.savepin.app/down...load.php?url=${encodeURIComponent(url)}&lang=en&type=redirect`);
		const html = response.data;
		const $ = cheerio.load(html);

		let results = [];
		$('td.video-quality').each((index, element) => {
			const type = $(element).text().trim();
			const format = $(element).next().text().trim();
			const downloadLinkElement = $(element).next().next().find('a');
			const downloadUrl = downloadLinkElement.attr('href');

			if (downloadUrl) {
				results.push({
					type,
					format,
					download: downloadUrl
				});
			}
		});

		if (results.length === 0) {
			throw new Error("No downloadable content found");
		}

		return {
			status: true,
			data: results
		};
	} catch (error) {
		return {
			status: false,
			message: error.message
		};
	}
}

module.exports = { savePin };


// =============================
//  🔥 Handler API (DITAMBAHKAN)
// =============================
export async function handler(query) {
  if (!query.url) {
    throw new Error("url is required");
  }

  const result = await savePin(query.url);
  return result;
}