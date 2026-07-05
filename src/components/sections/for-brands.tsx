"use client";

/* =============================================================================
 *  FOR BRANDS  (partnerships & wholesale)
 *  ---------------------------------------------------------------------------
 *  The B2B "deals with other brands" section. Benefits grid + a vertical
 *  partnership timeline + prominent CTA. Visually elevated panel.
 * ========================================================================== */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { brand } from "@/config/brand";
import { Icon } from "@/components/brand/icon";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function ForBrands({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { t } = useT();
  const b = t.brands;

  return (
    <section id="brands" className={hideHeading ? "relative overflow-hidden pb-20 pt-4 sm:pb-28 sm:pt-8" : "relative overflow-hidden py-20 sm:py-28"}>
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-full max-w-6xl -translate-x-1/2 hairline" />
        <div className="absolute right-0 top-1/3 h-72 w-72 bg-brand-accent/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-72 w-72 bg-brand-accent-2/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!hideHeading ? (
          <SectionHeading
            eyebrow={b.eyebrow}
            title={b.title}
            subtitle={b.subtitle}
          />
        ) : null}

        <div className={hideHeading ? "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12" : "mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"}>
          {/* Benefits */}
          <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {b.benefits.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-accent/40">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                    <Icon name={item.icon} className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Partnership timeline */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card to-background p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {b.pathLabel}
                  </p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {b.pathTitle}
                  </p>
                </div>
              </div>

              <ol className="relative mt-8 space-y-7 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                {b.steps.map((step, i) => (
                  <motion.li
                    key={step.n}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative flex gap-4"
                  >
                    <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-background font-heading text-xs font-bold text-brand-accent">
                      {step.n}
                    </span>
                    <div className="pt-0.5">
                      <h4 className="font-heading text-base font-semibold text-foreground">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <Button asChild className="mt-8 w-full group">
                <Link href={b.cta.href}>
                  {b.cta.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {brand.contact.responseTime}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
