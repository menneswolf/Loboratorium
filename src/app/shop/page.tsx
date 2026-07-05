"use client";

import { PageHeader } from "@/components/sections/page-header";
import { Shop } from "@/components/sections/shop";
import { useT } from "@/lib/i18n";

export default function ShopPage() {
  const { t } = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.shop.eyebrow}
        title={t.shop.title}
        subtitle={t.shop.subtitle}
      />
      <Shop hideHeading showFilter showViewAll={false} />
    </>
  );
}
