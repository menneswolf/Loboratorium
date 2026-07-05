"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Work } from "@/components/sections/work";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function WorkPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        subtitle={t.work.subtitle}
      />
      <Work hideHeading />
      <CtaBand />
    </>
  );
}
