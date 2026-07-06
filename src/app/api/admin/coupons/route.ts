import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { normalizeCode } from "@/lib/coupons";

const couponSchema = z.object({
  code: z.string().min(2).max(40),
  type: z.enum(["percent", "fixed"]),
  value: z.number().positive(),
  minOrder: z.number().min(0).nullable().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  const coupons = await db.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, coupons });
}

export async function POST(req: Request) {
  const parsed = couponSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid coupon." },
      { status: 422 }
    );
  }
  const d = parsed.data;
  if (d.type === "percent" && d.value > 100) {
    return NextResponse.json(
      { ok: false, error: "A percentage discount can't exceed 100%." },
      { status: 422 }
    );
  }
  try {
    const coupon = await db.coupon.create({
      data: {
        code: normalizeCode(d.code),
        type: d.type,
        value: d.value,
        minOrder: d.minOrder ?? null,
        maxUses: d.maxUses ?? null,
        expiresAt: d.expiresAt ? new Date(d.expiresAt) : null,
        active: d.active ?? true,
      },
    });
    return NextResponse.json({ ok: true, coupon }, { status: 201 });
  } catch (err) {
    console.error("[admin/coupons] create failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not create coupon (code may already exist)." },
      { status: 500 }
    );
  }
}
