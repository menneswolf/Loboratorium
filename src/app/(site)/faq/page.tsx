"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function FaqPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader eyebrow={t.faq.eyebrow} title={t.faq.title} />
      <Faq hideHeading />
      <CtaBand />
    </>
  );
}
