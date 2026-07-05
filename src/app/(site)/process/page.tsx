"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function ProcessPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader eyebrow={t.process.eyebrow} title={t.process.title} />
      <Process hideHeading />
      <CtaBand />
    </>
  );
}
