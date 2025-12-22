import axios from "axios"
import cheerio from "cheerio"

/* ===============================
   GEMPA TERKINI (BMKG)
   ASLI DARI FILE LU
================================ */
async function gempa() {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg")
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const drasa = []

        $("table > tbody > tr:nth-child(1) > td:nth-child(6) > span")
          .get()
          .map((rest) => {
            const dir = $(rest).text()
            drasa.push(dir.replace("\t", " "))
          })

        let rasa = ""
        for (let i = 0; i < drasa.length; i++) {
          rasa += drasa[i]
        }

        const format = {
          tanggal: $("table > tbody > tr:nth-child(1) > td:nth-child(1)").text(),
          waktu: $("table > tbody > tr:nth-child(1) > td:nth-child(2)").text(),
          lintang_bujur: $("table > tbody > tr:nth-child(1) > td:nth-child(3)").text(),
          magnitude: $("table > tbody > tr:nth-child(1) > td:nth-child(4)").text(),
          kedalaman: $("table > tbody > tr:nth-child(1) > td:nth-child(5)").text(),
          dirasakan: rasa,
        }

        const result = {
          source: "www.bmkg.go.id",
          data: format,
        }

        resolve(result)
      })
      .catch(reject)
  })
}

/* ===============================
   HANDLER (WAJIB BUAT API ROUTE)
================================ */
export async function handler() {
  // BMKG ga butuh query
  return await gempa()
}