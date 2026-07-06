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
  salePrice?: number | null; // EUR, when on sale
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
  seo?: {
    metaTitle?: LocalizedText | null;
    metaDescription?: LocalizedText | null;
    imageAlt?: LocalizedText | null;
  };
};

/** The price a customer actually pays — the sale price if one is set and lower. */
export function effectivePrice(p: Pick<Product, "price" | "salePrice">): number {
  if (p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price) {
    return p.salePrice;
  }
  return p.price;
}

/** True when the product has an active, lower sale price. */
export function isOnSale(p: Pick<Product, "price" | "salePrice">): boolean {
  return p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price;
}

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
