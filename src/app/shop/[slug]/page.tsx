"use client";

/* =============================================================================
 *  PRODUCT DETAIL PAGE  (/shop/[slug])
 *  ---------------------------------------------------------------------------
 *  Full product page: large image, name, price, description, specs, quantity
 *  selector + add to cart, and a "related products" strip. Falls back to
 *  not-found() if the slug doesn't match a product.
 * ========================================================================== */

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { products, localizedPrice } from "@/config/products";
import { PageHeader } from "@/components/sections/page-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { t, locale } = useT();
  const s = t.shop;
  const add = useCart((st) => st.add);
  const openDrawer = useCart((st) => st.openDrawer);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const handleBuyNow = () => {
    add(product.id, qty);
    openDrawer();
  };

  return (
    <>
      <PageHeader productName={product.name[locale]} />

      <section className="relative pb-20 pt-4 sm:pb-28 sm:pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <Reveal>
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
                <Image
                  src={product.image}
                  alt={product.name[locale]}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  priority
                />
                {product.badge ? (
                  <span className="absolute left-4 top-4 rounded-full bg-brand-accent px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-primary-foreground">
                    {s.badges[product.badge]}
                  </span>
                ) : null}
              </div>
            </Reveal>

            {/* Details */}
            <Reveal delay={0.1}>
              <div className="flex flex-col">
                <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  {product.name[locale]}
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <span className="font-heading text-3xl font-bold text-foreground">
                    {localizedPrice(product.price, locale)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stock > 0
                        ? "bg-brand-accent/10 text-brand-accent"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {product.stock > 0 ? s.inStock : s.outOfStock}
                  </span>
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {product.description[locale]}
                </p>

                {/* Specs */}
                <dl className="mt-6 space-y-2 border-y border-border py-4 text-sm">
                  <SpecRow label={s.specs.material} value={product.specs.material[locale]} />
                  <SpecRow label={s.specs.dimensions} value={product.specs.dimensions} />
                  <SpecRow label={s.specs.layerHeight} value={product.specs.layerHeight} />
                  <SpecRow label={s.specs.finishing} value={product.specs.finishing[locale]} />
                </dl>

                {/* Quantity + actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label="decrease"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-10 text-center font-heading font-semibold text-foreground">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="flex size-11 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label="increase"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <Button
                    onClick={handleAdd}
                    disabled={product.stock <= 0}
                    className="group flex-1 sm:flex-none"
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
                  <Button
                    onClick={handleBuyNow}
                    disabled={product.stock <= 0}
                    variant="secondary"
                    className="group flex-1 sm:flex-none"
                  >
                    {t.shop.cart.checkout}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  {t.pageMeta.shop}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Related products */}
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {t.home.featured.title.lead}{" "}
              <span className="text-gradient">{t.home.featured.title.accent}</span>
            </h2>
            <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/shop/${p.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand-accent/40"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name[locale]}
                        fill
                        sizes="(max-width: 640px) 45vw, 22vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        {p.name[locale]}
                      </h3>
                      <p className="mt-1 font-heading text-sm font-bold text-foreground">
                        {localizedPrice(p.price, locale)}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>
    </>
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
