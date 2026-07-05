"use client";

/* =============================================================================
 *  CART STORE  (Zustand + persist)
 *  ---------------------------------------------------------------------------
 *  Client-side shopping cart. Stores only productId + qty (name/image/price
 *  are resolved from the product catalogue at display time, so the cart stays
 *  language-aware and consistent with the catalogue). Also tracks the drawer
 *  open state and checkout dialog state.
 * ========================================================================== */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { productId: string; qty: number };

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  checkoutOpen: boolean;
  add: (productId: string, qty?: number) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      checkoutOpen: false,
      add: (productId, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i
              ),
              drawerOpen: true,
            };
          }
          return { items: [...s.items, { productId, qty }], drawerOpen: true };
        }),
      inc: (productId) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + 1 } : i
          ),
        })),
      dec: (productId) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId ? { ...i, qty: Math.max(1, i.qty - 1) } : i
            )
            .filter((i) => i.qty > 0),
        })),
      setQty: (productId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i
            )
            .filter((i) => i.qty > 0),
        })),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      openCheckout: () => set({ checkoutOpen: true, drawerOpen: false }),
      closeCheckout: () => set({ checkoutOpen: false }),
    }),
    {
      name: "lobo-cart",
      // Don't persist transient UI flags, only the cart items.
      partialize: (s) => ({ items: s.items }) as CartState,
    }
  )
);

/** Total number of units in the cart (for the navbar badge). */
export function useCartCount(): number {
  return useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
}
