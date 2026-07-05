"use client";

/* =============================================================================
 *  CTA BAND
 *  ---------------------------------------------------------------------------
 *  Full-width final call-to-action with animated gradient backdrop.
 * ========================================================================== */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand() {
  const { t } = useT();
  const c = t.ctaBand;

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* animated backdrop */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,var(--brand-accent)_40deg,transparent_120deg,transparent_360deg)] opacity-20 blur-2xl"
              />
              <div className="accent-glow absolute left-1/2 top-1/2 h-60 w-[680px] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {c.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              {c.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="group h-12 px-7 text-base">
                <Link href={c.button.href}>
                  {c.button.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
