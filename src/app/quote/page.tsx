"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Quote } from "@/components/sections/quote";
import { useT } from "@/lib/i18n";

export default function QuotePage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.quote.eyebrow}
        title={t.quote.title}
        subtitle={t.quote.subtitle}
      />
      <Quote hideHeading />
    </>
  );
}
