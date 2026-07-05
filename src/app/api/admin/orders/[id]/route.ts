import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const statusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = statusSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 422 });
  }

  try {
    const order = await db.order.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error("[admin/orders] update failed:", err);
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
}
