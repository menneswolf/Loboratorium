/* =============================================================================
 *  PRODUCT TYPES
 *  ---------------------------------------------------------------------------
 *  Shared shape for the webshop catalogue. The catalogue itself now lives in
 *  the database (`Product` model in prisma/schema.prisma) so it can be edited
 *  from /admin/products — see src/lib/products.ts (server reads) and
 *  src/lib/products-store.ts (client cache). `prisma/seed-data.ts` holds the
 *  original launch catalogue used only to seed the DB on first run.
 * ========================================================================== */

import type { Locale } from "@/config/translations";

export type LocalizedText = Record<Locale, string>;
export type ProductCategory = "decor" | "desk" | "kitchen" | "tech";
export type ProductBadge = "new" | "popular" | "limited";

export type Product = {
  id: string;
  slug: string;
  price: number; // EUR
  category: ProductCategory;
  image: string;
  badge?: ProductBadge;
  stock: number;
  modelUrl?: string | null;
  specs: {
    material: LocalizedText;
    dimensions: string; // language-neutral (numbers)
    layerHeight: string; // language-neutral
    finishing: LocalizedText;
  };
  name: LocalizedText;
  description: LocalizedText;
};

export function localizedPrice(price: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale === "en" ? "en-IE" : locale, {
      style: "currency",
      currency: "EUR",
    }).format(price);
  } catch {
    return `€${price.toFixed(2)}`;
  }
}
