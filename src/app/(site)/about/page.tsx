"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { Icon } from "@/components/brand/icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function AboutPage() {
  const { t, locale } = useT();
  const a = t.about;
  const h = t.hero;

  const valuesEyebrow =
    locale === "fr" ? "Nos valeurs" : locale === "nl" ? "Onze waarden" : "Our values";
  const valuesTitle =
    locale === "fr"
      ? { lead: "Ce en quoi", accent: "nous croyons." }
      : locale === "nl"
      ? { lead: "Waar we", accent: "voor staan." }
      : { lead: "What we stand", accent: "for." };

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} />

      {/* Story */}
      <section className="relative pb-20 pt-4 sm:pb-28 sm:pt-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-5">
            {a.story.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
              {h.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-6xl -translate-x-1/2 hairline" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={valuesEyebrow}
            title={valuesTitle}
          />
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v) => (
              <StaggerItem key={v.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-full rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                    <Icon name={v.icon} className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <Button asChild size="lg" className="group">
              <Link href={a.cta.href}>
                {a.cta.label}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
