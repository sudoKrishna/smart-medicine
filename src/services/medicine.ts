import medicines from "@/data/medicines.normalized.json";


type Medicine = {
    name: string;
    dosage: string;
    price: number | null;
    unit: string | null;
};


function hasPrice(m: Medicine): m is Medicine & { price: number } {
    return m.price !== null;
}

function normalize(text: string) {
    return text
        .toLowerCase()
        .replace(/[\(\)\+\-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function searchMedicine({ name }: { name: string }) {
    const query = normalize(name);
    const parts = query.split(" ").filter((p) => p.length > 0);

    const matches = (medicines as Medicine[]).filter((m) => {
        const combined = normalize(`${m.name} ${m.dosage}`);
        // every word in the user query must appear in the combined
        return parts.every((part) => combined.includes(part));
    });

    if (matches.length === 0) return null;

    const original = matches.find(hasPrice) ?? matches[0];

    if (!hasPrice(original)) {
        return { original, alternatives: [] };
    }

    const alternatives = (medicines as Medicine[]).filter(
        (m) =>
            m.dosage === original.dosage &&
            hasPrice(m) &&
            m.price < original.price
    );

    return { original, alternatives };
}
