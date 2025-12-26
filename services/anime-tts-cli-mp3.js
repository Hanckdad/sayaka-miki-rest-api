/**
 * REAL IMPLEMENTATION — CLI ANIME TTS + AUTO MP3 EXPORT
 * WAV dari VoiceVox → Convert ke MP3 (FFMPEG)
 */

const readline = require("readline");
const axios = require("axios");
const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const VOICEVOX_HOST = "http://127.0.0.1:50021";

// ====== VOICE LIST (Banyak Pilihan Suara Anime) ======
const VOICES = [
  { id: 1, name: "Hiroshi" },
  { id: 2, name: "Yomi" },
  { id: 3, name: "Zundamon" },
  { id: 8, name: "Kasumi" },
  { id: 11, name: "Shigure" },
  { id: 12, name: "Tamaki" },
  { id: 20, name: "Aoi" },
  { id: 24, name: "Akane" },
  { id: 30, name: "MikuStyle" },
];

// ====== Create Output Folder ======
const outDir = path.join(__dirname, "output");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// ====== Generate WAV from VoiceVox ======
async function generateWav(text, voiceId, filenameWav) {
  const query = await axios.post(
    `${VOICEVOX_HOST}/audio_query`,
    null,
    { params: { text, speaker: voiceId } }
  );

  const synth = await axios.post(
    `${VOICEVOX_HOST}/synthesis`,
    query.data,
    {
      params: { speaker: voiceId },
      responseType: "arraybuffer",
    }
  );

  fs.writeFileSync(filenameWav, synth.data);
  console.log(`✓ WAV Saved: ${filenameWav}`);
}

// ====== Convert WAV → MP3 (REAL ENCODING) ======
function convertToMp3(wavPath, mp3Path) {
  const cmd = `ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -qscale:a 2 "${mp3Path}"`;
  execSync(cmd);
  console.log(`🎧 MP3 Exported: ${mp3Path}`);
}

// ====== CLI MENU ======
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n=== PILIH SUARA ANIME ===");
VOICES.forEach((v, i) => console.log(`${i + 1}. ${v.name} (id:${v.id})`));

rl.question("\nMasukkan nomor suara: ", async (num) => {
  const voice = VOICES[num - 1];
  if (!voice) {
    console.log("❌ Nomor tidak valid.");
    return rl.close();
  }

  rl.question("\nMasukkan teks yang mau dibacakan: ", async (text) => {
    if (!text.trim()) {
      console.log("❌ Teks tidak boleh kosong.");
      return rl.close();
    }

    const baseName = `${voice.name}_${Date.now()}`;
    const wavFile = path.join(outDir, `${baseName}.wav`);
    const mp3File = path.join(outDir, `${baseName}.mp3`);

    console.log("\n🎤 Generating Voice…");
    await generateWav(text, voice.id, wavFile);

    console.log("🔄 Converting to MP3…");
    convertToMp3(wavFile, mp3File);

    console.log("\n🔥 DONE — WAV + MP3 READY!");
    console.log(`Folder: ${outDir}\n`);
    rl.close();
  });
});