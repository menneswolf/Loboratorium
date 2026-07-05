"use client";

import { PageHeader } from "@/components/sections/page-header";
import { CustomOrders } from "@/components/sections/custom-orders";
import { CtaBand } from "@/components/sections/cta-band";
import { useT } from "@/lib/i18n";

export default function CustomOrdersPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.customOrders.eyebrow}
        title={t.customOrders.title}
        subtitle={t.customOrders.subtitle}
      />
      <CustomOrders hideHeading />
      <CtaBand />
    </>
  );
}
