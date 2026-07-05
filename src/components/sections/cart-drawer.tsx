"use client";

/* =============================================================================
 *  CART DRAWER
 *  ---------------------------------------------------------------------------
 *  Slide-over cart (shadcn Sheet). Lists cart items resolved from the product
 *  catalogue (so names/images stay in the active language), with qty controls,
 *  subtotal, shipping note and a checkout button that opens CheckoutDialog.
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { localizedPrice } from "@/config/products";
import { useProducts } from "@/lib/products-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { t, locale } = useT();
  const s = t.shop;
  const items = useCart((st) => st.items);
  const drawerOpen = useCart((st) => st.drawerOpen);
  const closeDrawer = useCart((st) => st.closeDrawer);
  const inc = useCart((st) => st.inc);
  const dec = useCart((st) => st.dec);
  const remove = useCart((st) => st.remove);
  const clear = useCart((st) => st.clear);
  const openCheckout = useCart((st) => st.openCheckout);
  const products = useProducts();

  const lines = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, qty: i.qty } : null;
    })
    .filter((x): x is { product: (typeof products)[number]; qty: number } => x !== null);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 6.5;
  const total = subtotal + shipping;

  return (
    <Sheet open={drawerOpen} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-border bg-card p-0 sm:max-w-md"
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
          <div>
            <SheetTitle className="font-heading text-lg font-bold">
              {s.cart.title}
            </SheetTitle>
            <SheetDescription className="sr-only">{s.cart.title}</SheetDescription>
          </div>
          <button
            onClick={closeDrawer}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="size-4" />
          </button>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <ShoppingBag className="size-7" />
            </span>
            <p className="mt-4 font-heading text-lg font-semibold text-foreground">
              {s.cart.empty}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.cart.emptyHint}</p>
            <Button asChild variant="outline" className="mt-5" onClick={closeDrawer}>
              <Link href="/shop">{s.cart.browse}</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-3">
                {lines.map((l) => (
                  <li
                    key={l.product.id}
                    className="flex gap-3 rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={l.product.image}
                        alt={l.product.name[locale]}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-heading text-sm font-semibold leading-tight text-foreground">
                          {l.product.name[locale]}
                        </p>
                        <button
                          onClick={() => remove(l.product.id)}
                          aria-label={s.cart.remove}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {localizedPrice(l.product.price, locale)} {s.cart.each}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            onClick={() => dec(l.product.id)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="decrease"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-foreground">
                            {l.qty}
                          </span>
                          <button
                            onClick={() => inc(l.product.id)}
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            aria-label="increase"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-heading text-sm font-bold text-foreground">
                          {localizedPrice(l.product.price * l.qty, locale)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={clear}
                className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {s.cart.clear}
              </button>
            </div>

            {/* Summary */}
            <div className="border-t border-border px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{s.cart.subtotal}</dt>
                  <dd className="font-medium text-foreground">
                    {localizedPrice(subtotal, locale)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{s.cart.shipping}</dt>
                  <dd className="font-medium text-foreground">
                    {shipping === 0 ? s.cart.shippingNote.split("·")[1]?.trim() || "Free" : localizedPrice(shipping, locale)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-heading text-base font-bold">
                  <dt className="text-foreground">{s.cart.total}</dt>
                  <dd className="text-foreground">{localizedPrice(total, locale)}</dd>
                </div>
              </dl>
              <p className="mt-2 text-xs text-muted-foreground">{s.cart.shippingNote}</p>
              <Button onClick={openCheckout} className="mt-4 w-full group">
                {s.cart.checkout}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
