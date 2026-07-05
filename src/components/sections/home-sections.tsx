"use client";

/* =============================================================================
 *  HOME-SPECIFIC SECTIONS
 *  ---------------------------------------------------------------------------
 *  WhatWeDo (two big cards → /custom-orders & /brands) and ProcessTeaser,
 *  used only on the home page.
 * ========================================================================== */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function WhatWeDo() {
  const { t } = useT();
  const w = t.home.whatWeDo;
  const cards = [
    { ...w.custom, href: w.custom.cta.href, accent: "from-brand-accent/20" },
    { ...w.brands, href: w.brands.cta.href, accent: "from-brand-accent-2/15" },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-full max-w-6xl -translate-x-1/2 hairline" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} subtitle={w.subtitle} />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-8"
              >
                <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} to-transparent blur-2xl`} />
                <h3 className="relative font-heading text-2xl font-bold text-foreground">
                  {c.title}
                </h3>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {c.text}
                </p>
                <Button asChild variant="secondary" className="relative mt-6 group/btn">
                  <Link href={c.cta.href}>
                    {c.cta.label}
                    <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTeaser() {
  const { t } = useT();
  const p = t.home.processTeaser;
  const steps = t.process.steps;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-64 w-[600px] -translate-x-1/2 bg-brand-accent/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} />
          <Reveal delay={0.1}>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <span className="font-heading text-sm font-bold text-brand-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-1 font-heading text-base font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </motion.li>
              ))}
            </ol>
            <Button asChild variant="outline" className="mt-6 group">
              <Link href={p.cta.href}>
                {p.cta.label}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
