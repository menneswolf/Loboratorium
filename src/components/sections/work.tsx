"use client";

/* =============================================================================
 *  WORK / GALLERY
 *  ---------------------------------------------------------------------------
 *  Bento-ish portfolio grid with hover zoom + category badge.
 * ========================================================================== */

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Work({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { t } = useT();
  const w = t.work;

  return (
    <section id="work" className={hideHeading ? "relative pb-20 pt-4 sm:pb-28 sm:pt-8" : "relative py-20 sm:py-28"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!hideHeading ? (
          <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />
        ) : null}

        <StaggerGroup className={hideHeading ? "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" : "mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
          {w.items.map((item, i) => (
            <StaggerItem
              key={item.title}
              className={cn(
                i === 0 && "lg:col-span-2 lg:row-span-2",
                "h-full"
              )}
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    i === 0 ? "aspect-[4/3] lg:aspect-square" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-brand-accent">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-heading text-base font-semibold text-foreground sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-all duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
