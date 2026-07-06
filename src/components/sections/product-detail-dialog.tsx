"use client";

/* =============================================================================
 *  PRODUCT DETAIL DIALOG
 *  ---------------------------------------------------------------------------
 *  Modal with a larger image, full description, specs and quantity add-to-cart.
 * ========================================================================== */

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useT } from "@/lib/i18n";
import { type Product } from "@/config/products";
import { PriceTag } from "@/components/brand/price-tag";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";

export function ProductDetailDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { t, locale } = useT();
  const s = t.shop;
  const add = useCart((st) => st.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const open = product !== null;

  const handleAdd = () => {
    if (!product) return;
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden border-border bg-card p-0 sm:max-w-3xl">
        {product ? (
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name[locale]}
                fill
                sizes="(max-width: 640px) 90vw, 360px"
                className="object-cover"
              />
              {product.badge ? (
                <span className="absolute left-3 top-3 rounded-full bg-brand-accent px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  {s.badges[product.badge]}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col p-5 sm:p-6">
              <DialogHeader className="space-y-0 p-0 text-left">
                <DialogTitle className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  {product.name[locale]}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.description[locale]}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 flex items-center gap-2">
                <PriceTag
                  product={product}
                  locale={locale}
                  className="font-heading text-2xl font-bold text-foreground"
                />
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    product.stock > 0
                      ? "bg-brand-accent/10 text-brand-accent"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {product.stock > 0 ? s.inStock : s.outOfStock}
                </span>
              </div>

              {/* Specs */}
              <dl className="mt-5 space-y-2 border-y border-border py-4 text-sm">
                <SpecRow label={s.specs.material} value={product.specs.material[locale]} />
                <SpecRow label={s.specs.dimensions} value={product.specs.dimensions} />
                <SpecRow label={s.specs.layerHeight} value={product.specs.layerHeight} />
                <SpecRow label={s.specs.finishing} value={product.specs.finishing[locale]} />
              </dl>

              {/* Quantity + add */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="decrease"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-9 text-center font-heading font-semibold text-foreground">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="increase"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className="group flex-1"
                >
                  {added ? (
                    <>
                      <Check className="size-4" />
                      {s.added}
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="size-4" />
                      {s.addToCart}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
