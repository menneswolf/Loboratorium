"use client";

/* =============================================================================
 *  PRODUCTS STORE (client cache)
 *  ---------------------------------------------------------------------------
 *  Fetches the catalogue from /api/products once and caches it client-side so
 *  components can look products up synchronously (mirrors how the old static
 *  `products` array worked, but now backed by the database). Hydrated once by
 *  <ProductsHydrator/> mounted in the root layout.
 * ========================================================================== */

import { create } from "zustand";
import type { Product } from "@/config/products";

type ProductsState = {
  products: Product[];
  loaded: boolean;
  fetchProducts: () => Promise<void>;
};

export const useProductsStore = create<ProductsState>()((set, get) => ({
  products: [],
  loaded: false,
  fetchProducts: async () => {
    if (get().loaded) return;
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.ok) set({ products: data.products, loaded: true });
    } catch (err) {
      console.error("[products-store] fetch failed:", err);
    }
  },
}));

export function useProducts(): Product[] {
  return useProductsStore((s) => s.products);
}

export function getProductSync(id: string): Product | undefined {
  return useProductsStore.getState().products.find((p) => p.id === id);
}

export function getProductBySlugSync(slug: string): Product | undefined {
  return useProductsStore.getState().products.find((p) => p.slug === slug);
}
