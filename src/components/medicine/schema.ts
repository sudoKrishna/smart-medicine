import { z } from "zod";

export const medicineSchema = z.object({
    original: z.object({
        name: z.string(),
        brand: z.string(),
        salt: z.string(),
        strength: z.string(),
        price: z.number(),
        manufacturer: z.string(),
    }),
    alternatives: z.array(
        z.object({
            name: z.string(),
            brand: z.string(),
            salt: z.string(),
            strength: z.string(),
            price: z.number(),
            manufacturer: z.string(),
        })
    ),
});
