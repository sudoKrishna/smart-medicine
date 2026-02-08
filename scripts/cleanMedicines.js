const fs = require("fs");

console.log("🔥 Script started");

const RAW_PATH = "data/rawMedicines.json";

if (!fs.existsSync(RAW_PATH)) {
  console.error("❌ rawMedicines.json NOT FOUND");
  process.exit(1);
}

const rawFile = fs.readFileSync(RAW_PATH, "utf-8");
const parsed = JSON.parse(rawFile);

// 🔥 IMPORTANT FIX
const rawText = Object.keys(parsed)[0];

if (!rawText) {
  console.error("❌ rawText empty");
  process.exit(1);
}

console.log("📝 Raw text length:", rawText.length);

// clean + split
const lines = rawText
  .replace(/\uFEFF/g, "")
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

console.log("📊 Total lines:", lines.length);

const medicines = [];

for (let i = 0; i < lines.length; i++) {
  if (/^\d+$/.test(lines[i])) {
    medicines.push({
      name: lines[i + 1] ?? "",
      dosage: lines[i + 2] ?? "",
      price: lines[i + 3] ?? "",
    });
  }
}

console.log("💊 Medicines parsed:", medicines.length);

fs.writeFileSync(
  "data/medicines.json",
  JSON.stringify(medicines, null, 2)
);

console.log("✅ data/medicines.json created");
