const fs = require("fs");

const input = JSON.parse(fs.readFileSync("data/medicines.json", "utf-8"));

function extractPrice(str) {
    const match = str.match(/([\d.]+)/);
    return match ? Number(match[1]) : null;
}

function extractUnit(str) {
    const match = str.match(/\((.*?)\)/);
    return match ? match[1] : null;
}

const normalized = input.map((m) => ({
    name: m.name.trim().toUpperCase(),
    dosage: m.dosage.trim(),
    price: extractPrice(m.price),
    unit: extractUnit(m.price),
}));

fs.writeFileSync(
    "data/medicines.normalized.json",
    JSON.stringify(normalized, null, 2)
);

console.log("✅ Normalized medicines saved");
