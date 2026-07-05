"use client";

import { PageHeader } from "@/components/sections/page-header";
import { ForBrands } from "@/components/sections/for-brands";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function BrandsPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.brands.eyebrow}
        title={t.brands.title}
        subtitle={t.brands.subtitle}
      />
      <ForBrands hideHeading />
      <CtaBand />
    </>
  );
}
