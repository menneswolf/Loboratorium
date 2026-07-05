"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/lib/products-store";

export function ProductsHydrator() {
  const fetchProducts = useProductsStore((s) => s.fetchProducts);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return null;
}
