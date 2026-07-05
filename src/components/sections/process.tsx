"use client";

/* =============================================================================
 *  PROCESS
 *  ---------------------------------------------------------------------------
 *  Four-step "how it works" with a connecting animated line.
 * ========================================================================== */

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";

export function Process({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const { t } = useT();
  const p = t.process;

  return (
    <section id="process" className={hideHeading ? "relative overflow-hidden pb-20 pt-4 sm:pb-28 sm:pt-8" : "relative overflow-hidden py-20 sm:py-28"}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 bg-brand-accent/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {!hideHeading ? (
          <SectionHeading eyebrow={p.eyebrow} title={p.title} />
        ) : null}

        <div className="relative mt-12">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-border lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-accent to-brand-accent-2 lg:block"
          />

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {p.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.12} className="relative">
                <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-border bg-card font-heading text-lg font-bold text-brand-accent shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]">
                  {step.n}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
