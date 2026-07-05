"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Capabilities } from "@/components/sections/capabilities";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function CapabilitiesPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.capabilities.eyebrow}
        title={t.capabilities.title}
        subtitle={t.capabilities.subtitle}
      />
      <Capabilities hideHeading />
      <CtaBand />
    </>
  );
}
