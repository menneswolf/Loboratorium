"use client";

/* =============================================================================
 *  CUSTOM ORDERS
 *  ---------------------------------------------------------------------------
 *  The core B2C/B2B "what you can order" section. Feature grid with hover
 *  reveal + a sticky visual panel + closing CTA.
 * ========================================================================== */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { content } from "@/config/brand";
import { Icon } from "@/components/brand/icon";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function CustomOrders() {
  const c = content.customOrders;

  return (
    <section id="custom-orders" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          subtitle={c.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          {/* Feature grid */}
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.items.map((item) => (
              <StaggerItem key={item.title}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-accent/40"
                >
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-accent/0 blur-2xl transition-all duration-500 group-hover:bg-brand-accent/20" />
                  <div className="relative flex size-11 items-center justify-center rounded-xl border border-border bg-background text-brand-accent">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <h3 className="relative mt-4 font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Sticky visual */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/images/gallery-1.png"
                  alt="Custom 3D printed prototype part"
                  fill
                  sizes="(max-width: 1024px) 90vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-accent">
                  Made to order
                </p>
                <p className="mt-2 font-heading text-xl font-semibold text-foreground">
                  One part or a thousand — same care, every time.
                </p>
                <Button asChild variant="secondary" className="mt-4 group">
                  <Link href={c.cta.href}>
                    {c.cta.label}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
