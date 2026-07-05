"use client";

import { Hero } from "@/components/sections/hero";
import { Shop } from "@/components/sections/shop";
import { WhatWeDo, ProcessTeaser } from "@/components/sections/home-sections";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { useT } from "@/lib/i18n";

export default function Home() {
  const { t } = useT();
  return (
    <>
      <Hero />
      <section className="relative py-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t.home.featured.eyebrow}
            title={t.home.featured.title}
            subtitle={t.home.featured.subtitle}
          />
        </div>
        <Shop hideHeading featured={4} showFilter={false} showViewAll />
      </section>
      <WhatWeDo />
      <ProcessTeaser />
      <CtaBand />
    </>
  );
}
