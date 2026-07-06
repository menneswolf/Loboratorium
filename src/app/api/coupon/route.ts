import { NextResponse } from "next/server";
import { z } from "zod";
import { validateCoupon } from "@/lib/coupons";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  code: z.string().min(1).max(40),
  subtotal: z.number().min(0),
});

/** Public: preview a coupon's discount at checkout. The authoritative check
 *  still happens server-side when the order is placed (/api/orders). */
export async function POST(req: Request) {
  const limited = rateLimit(req, "coupon");
  if (limited) return limited;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
  }

  const result = await validateCoupon(parsed.data.code, parsed.data.subtotal);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 200 });
  }
  return NextResponse.json({
    ok: true,
    code: result.code,
    discount: result.discount,
    type: result.type,
    value: result.value,
  });
}
