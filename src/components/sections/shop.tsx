"use client";

/* =============================================================================
 *  SHOP
 *  ---------------------------------------------------------------------------
 *  The "normal webshop" part: a filterable product grid. Each card shows the
 *  localised name, price and an add-to-cart button; clicking the card opens a
 *  detail dialog. Category chips filter the grid.
 * ========================================================================== */

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useT } from "@/lib/i18n";
import {
  products,
  localizedPrice,
  type Product,
  type ProductCategory,
} from "@/config/products";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ProductDetailDialog } from "./product-detail-dialog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Filter = "all" | ProductCategory;

export function Shop() {
  const { t, locale } = useT();
  const s = t.shop;
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Product | null>(null);
  const add = useCart((st) => st.add);

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const categories: Filter[] = ["all", "decor", "desk", "kitchen", "tech"];

  return (
    <section id="shop" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-10 h-72 w-72 bg-brand-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === c
                  ? "border-brand-accent bg-brand-accent text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {s.categories[c]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <StaggerGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard
                product={p}
                onOpen={() => setActive(p)}
                onAdd={() => add(p.id, 1)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <ProductDetailDialog
        product={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: () => void;
  onAdd: () => void;
}) {
  const { t, locale } = useT();
  const s = t.shop;
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={onOpen}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand-accent/40"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute left-2 top-2 rounded-full bg-brand-accent px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            {s.badges[product.badge]}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-heading text-sm font-semibold leading-tight text-foreground sm:text-base">
          {product.name[locale]}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
          {product.description[locale]}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 pt-1">
          <span className="font-heading text-base font-bold text-foreground sm:text-lg">
            {localizedPrice(product.price, locale)}
          </span>
          <Button
            size="icon"
            onClick={handleAdd}
            aria-label={s.addToCart}
            className="size-8 shrink-0 sm:size-9"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
