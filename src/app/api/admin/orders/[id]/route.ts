import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSendcloudParcel, isSendcloudConfigured } from "@/lib/sendcloud";

const statusSchema = z.object({
  status: z.enum([
    "pending",
    "pending_payment",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "failed",
    "expired",
  ]),
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

/* Manually create a Sendcloud shipping label for an order. Complements the
 * automatic creation in the Mollie webhook — covers email-flow orders and any
 * order where auto-creation didn't run or failed. */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSendcloudConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Sendcloud is not configured. Add SENDCLOUD_PUBLIC_KEY and SENDCLOUD_SECRET_KEY.",
      },
      { status: 400 }
    );
  }

  const order = await db.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
  if (order.sendcloudParcelId) {
    return NextResponse.json({ ok: true, order }); // already has a label
  }

  try {
    const parcel = await createSendcloudParcel(order);
    if (!parcel) {
      return NextResponse.json(
        { ok: false, error: "Could not create label." },
        { status: 502 }
      );
    }
    const updated = await db.order.update({
      where: { id },
      data: {
        status: "shipped",
        sendcloudParcelId: parcel.sendcloudParcelId,
        trackingNumber: parcel.trackingNumber,
        trackingUrl: parcel.trackingUrl,
        labelUrl: parcel.labelUrl,
      },
    });
    return NextResponse.json({ ok: true, order: updated });
  } catch (err) {
    console.error("[admin/orders] label creation failed:", err);
    return NextResponse.json(
      { ok: false, error: "Sendcloud label creation failed. Check your keys and shipping method." },
      { status: 502 }
    );
  }
}
