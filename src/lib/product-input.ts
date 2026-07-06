import { z } from "zod";

/* Shared validation + Prisma-shaping for admin product create/update. */

const localizedText = z.object({ en: z.string(), nl: z.string(), fr: z.string() });

export const productInputSchema = z.object({
  slug: z.string().min(1),
  price: z.number().min(0),
  salePrice: z.number().min(0).nullable().optional(),
  category: z.enum(["decor", "desk", "kitchen", "tech"]),
  image: z.string().min(1),
  badge: z.string().optional(),
  stock: z.number().int().min(0),
  modelUrl: z.string().optional(),
  material: localizedText,
  dimensions: z.string(),
  layerHeight: z.string(),
  finishing: localizedText,
  name: localizedText,
  description: localizedText,
  metaTitle: localizedText.optional(),
  metaDescription: localizedText.optional(),
  imageAlt: localizedText.optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;

const EMPTY_L = { en: "", nl: "", fr: "" };

export function toPrismaProductData(d: ProductInput) {
  const { badge, modelUrl, salePrice, metaTitle, metaDescription, imageAlt, ...rest } = d;
  return {
    ...rest,
    badge: badge || null,
    modelUrl: modelUrl || null,
    salePrice: salePrice ?? null,
    metaTitle: metaTitle ?? EMPTY_L,
    metaDescription: metaDescription ?? EMPTY_L,
    imageAlt: imageAlt ?? EMPTY_L,
  };
}
