import { db } from "@/lib/db";

/* =============================================================================
 *  COUPONS
 *  ---------------------------------------------------------------------------
 *  Server-side validation + redemption. Codes are stored and compared in
 *  UPPERCASE. Discounts are always recomputed here from the subtotal — a
 *  client-supplied discount is never trusted.
 * ========================================================================== */

export type CouponValidation =
  | { ok: true; code: string; discount: number; type: string; value: number }
  | { ok: false; error: string };

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function validateCoupon(
  rawCode: string,
  subtotal: number
): Promise<CouponValidation> {
  const code = normalizeCode(rawCode);
  if (!code) return { ok: false, error: "Enter a coupon code." };

  const coupon = await db.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.active) {
    return { ok: false, error: "Invalid coupon code." };
  }
  if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
    return { ok: false, error: "This coupon has expired." };
  }
  if (coupon.maxUses != null && coupon.usedCount >= coupon.maxUses) {
    return { ok: false, error: "This coupon has reached its usage limit." };
  }
  if (coupon.minOrder != null && subtotal < coupon.minOrder) {
    return {
      ok: false,
      error: `Spend at least €${coupon.minOrder.toFixed(2)} to use this coupon.`,
    };
  }

  let discount =
    coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  discount = Math.min(discount, subtotal); // never exceed the subtotal
  discount = Math.round(discount * 100) / 100;

  return { ok: true, code, discount, type: coupon.type, value: coupon.value };
}

/** Increment the usage counter after an order is placed. Best-effort. */
export async function redeemCoupon(code: string): Promise<void> {
  try {
    await db.coupon.update({
      where: { code: normalizeCode(code) },
      data: { usedCount: { increment: 1 } },
    });
  } catch {
    // coupon may have been deleted between validate and redeem — ignore
  }
}
