import fs from "fs";
import path from "path";
import crypto from "crypto";

const dbPath = path.join(process.cwd(), "data", "apikeys.json");

function loadKeys() {
  if (!fs.existsSync(dbPath)) return [];
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveKeys(keys) {
  fs.writeFileSync(dbPath, JSON.stringify(keys, null, 2));
}

export function addKey(label = "unnamed") {
  const keys = loadKeys();
  const key = crypto.randomBytes(24).toString("hex");

  keys.push({
    key,
    label,
    createdAt: Date.now(),
    active: true,
  });

  saveKeys(keys);
  return key;
}

export function deleteKey(key) {
  let keys = loadKeys();
  keys = keys.filter(k => k.key !== key);
  saveKeys(keys);
  return true;
}

export function listKeys() {
  return loadKeys();
}

export function verifyKey(key) {
  const keys = loadKeys();
  return keys.some(k => k.key === key && k.active);
}