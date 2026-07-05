import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getMollie } from "@/lib/mollie";
import { createSendcloudParcel, isSendcloudConfigured } from "@/lib/sendcloud";

export async function POST(req: Request) {
  const body = await req.text();
  const id = new URLSearchParams(body).get("id") || parseJsonPaymentId(body);

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing payment id." }, { status: 400 });
  }

  try {
    const payment = await getMollie().payments.get(id);
    const order = await db.order.findFirst({
      where: { paymentId: payment.id },
      include: { items: true },
    });

    if (!order) {
      console.warn(`[mollie webhook] no order for payment ${payment.id}`);
      return NextResponse.json({ ok: true });
    }

    const status = mapPaymentStatus(payment.status);
    const paidAt = payment.paidAt ? new Date(payment.paidAt) : null;

    const updated = await db.order.update({
      where: { id: order.id },
      data: {
        status,
        paymentStatus: payment.status,
        paidAt: status === "paid" ? paidAt ?? new Date() : order.paidAt,
      },
      include: { items: true },
    });

    if (status === "paid" && isSendcloudConfigured() && !updated.sendcloudParcelId) {
      try {
        const parcel = await createSendcloudParcel(updated);
        if (parcel) {
          await db.order.update({
            where: { id: updated.id },
            data: {
              status: "processing",
              sendcloudParcelId: parcel.sendcloudParcelId,
              trackingNumber: parcel.trackingNumber,
              trackingUrl: parcel.trackingUrl,
              labelUrl: parcel.labelUrl,
            },
          });
        }
      } catch (err) {
        console.error("[mollie webhook] sendcloud parcel failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[mollie webhook] failed:", err);
    return NextResponse.json({ ok: false, error: "Webhook failed." }, { status: 500 });
  }
}

function parseJsonPaymentId(body: string): string | null {
  try {
    const json = JSON.parse(body) as { id?: unknown };
    return typeof json.id === "string" ? json.id : null;
  } catch {
    return null;
  }
}

function mapPaymentStatus(status: string): string {
  if (status === "paid" || status === "authorized") return "paid";
  if (status === "failed") return "failed";
  if (status === "expired") return "expired";
  if (status === "canceled") return "cancelled";
  return "pending_payment";
}
