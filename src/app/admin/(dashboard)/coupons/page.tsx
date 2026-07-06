import { db } from "@/lib/db";
import { CouponsManager } from "@/components/admin/coupons-manager";

export const dynamic = "force-dynamic";

export default async function CouponsPage() {
  const coupons = await db.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-bold sm:text-3xl">Coupons</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Discount codes customers can enter at checkout.
      </p>
      <CouponsManager
        initial={coupons.map((c) => ({
          id: c.id,
          code: c.code,
          type: c.type,
          value: c.value,
          minOrder: c.minOrder,
          maxUses: c.maxUses,
          usedCount: c.usedCount,
          expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
          active: c.active,
        }))}
      />
    </div>
  );
}
