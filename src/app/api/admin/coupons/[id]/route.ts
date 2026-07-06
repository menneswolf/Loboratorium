import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const patchSchema = z.object({
  active: z.boolean().optional(),
  value: z.number().positive().optional(),
  minOrder: z.number().min(0).nullable().optional(),
  maxUses: z.number().int().positive().nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid update." }, { status: 422 });
  }
  const d = parsed.data;
  try {
    const coupon = await db.coupon.update({
      where: { id },
      data: {
        ...(d.active !== undefined ? { active: d.active } : {}),
        ...(d.value !== undefined ? { value: d.value } : {}),
        ...(d.minOrder !== undefined ? { minOrder: d.minOrder } : {}),
        ...(d.maxUses !== undefined ? { maxUses: d.maxUses } : {}),
        ...(d.expiresAt !== undefined
          ? { expiresAt: d.expiresAt ? new Date(d.expiresAt) : null }
          : {}),
      },
    });
    return NextResponse.json({ ok: true, coupon });
  } catch {
    return NextResponse.json({ ok: false, error: "Coupon not found." }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.coupon.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Coupon not found." }, { status: 404 });
  }
}
