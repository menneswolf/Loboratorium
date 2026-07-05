"use client";

/* =============================================================================
 *  HERO
 *  ---------------------------------------------------------------------------
 *  Above-the-fold showpiece: eyebrow badge, gradient headline, dual CTAs,
 *  animated stat counters, and a stylised 3D-print visual with floating chips.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MoveRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/motion/reveal";

/* Parse "12k+", "40+", "96h", "30+" into numeric + suffix for the counter. */
function parseStat(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const { num, suffix } = parseStat(value);
  const [display, setDisplay] = useState(reduce ? num : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // respect reduced motion: jump to final value in a callback
      const id = requestAnimationFrame(() => setDisplay(num));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(num * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(num);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, reduce]);

  const shown = Number.isInteger(num) ? Math.round(display) : display.toFixed(1);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

export function Hero() {
  const { t } = useT();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="accent-glow absolute -top-24 left-1/2 h-[420px] w-[680px] -translate-x-1/2" />
        <div className="absolute -left-20 top-40 h-72 w-72 animate-blob bg-brand-accent/20 blur-3xl" />
        <div className="absolute -right-16 top-24 h-80 w-80 animate-blob bg-brand-accent-2/15 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
            </span>
            {h.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {h.title.lead}{" "}
            <span className="text-gradient">{h.title.accent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg" className="sheen group h-12 px-6 text-base">
              <Link href={h.primaryCta.href}>
                {h.primaryCta.label}
                <ArrowRight className="relative z-[2] transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-12 border-border bg-card/40 px-6 text-base backdrop-blur hover:bg-card"
            >
              <Link href={h.secondaryCta.href}>
                {h.secondaryCta.label}
                <MoveRight className="text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
          >
            {h.stats.map((s) => (
              <div key={s.label} className="border-l border-border pl-4">
                <dt className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  <CountUp value={s.value} />
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/hero-print.png"
              alt="3D printer nozzle extruding molten orange filament"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

            {/* "Now printing" HUD */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
              </span>
              Now printing
            </motion.div>

            {/* Floating spec chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-4 top-4 rounded-xl border border-border bg-background/70 px-3 py-2 text-xs backdrop-blur"
            >
              <p className="text-muted-foreground">Layer height</p>
              <p className="font-heading font-semibold text-foreground">0.12 mm</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-4 right-4 rounded-xl border border-border bg-background/70 px-3 py-2 text-xs backdrop-blur"
            >
              <p className="text-muted-foreground">Material</p>
              <p className="font-heading font-semibold text-foreground">PETG · Orange</p>
            </motion.div>
          </div>

          {/* Glow under card */}
          <div className="accent-glow absolute -bottom-8 left-1/2 -z-10 h-40 w-3/4 -translate-x-1/2" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-16 sm:mt-20">
        <Marquee items={t.marquee} />
      </div>
    </section>
  );
}
