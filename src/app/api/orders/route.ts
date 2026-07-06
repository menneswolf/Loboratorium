import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getAllProducts } from "@/lib/products";
import { effectivePrice } from "@/config/products";
import { rateLimit } from "@/lib/rate-limit";
import { getMollie, isMollieConfigured, eur } from "@/lib/mollie";
import { baseUrl } from "@/lib/base-url";
import { getSettings, computeShipping } from "@/lib/settings";
import { validateCoupon, redeemCoupon } from "@/lib/coupons";

const orderSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  address: z.string().min(4).max(300),
  houseNumber: z.string().max(20).optional().or(z.literal("")),
  city: z.string().min(2).max(120),
  postalCode: z.string().min(2).max(20),
  country: z.string().min(2).max(120),
  couponCode: z.string().max(40).optional().or(z.literal("")),
  locale: z.enum(["en", "nl", "fr"]).default("en"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        qty: z.number().int().min(1).max(999),
      })
    )
    .min(1, "Cart is empty"),
});

function makeRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `LOB-${s}`;
}

export async function POST(req: Request) {
  const limited = rateLimit(req, "orders");
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Invalid order." },
      { status: 422 }
    );
  }

  const settings = await getSettings();
  if (!settings.checkoutEnabled) {
    return NextResponse.json(
      { ok: false, error: "The shop is not accepting orders right now." },
      { status: 403 }
    );
  }

  // Resolve items against the server-side catalogue to compute the real total.
  // (Never trust prices sent from the client — uses the sale price if set.)
  const products = await getAllProducts();
  const lineItems: { productId: string; name: string; price: number; qty: number }[] = [];
  let subtotal = 0;
  for (const item of parsed.data.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return NextResponse.json(
        { ok: false, error: `Unknown product: ${item.productId}` },
        { status: 422 }
      );
    }
    if (product.stock <= 0) {
      return NextResponse.json(
        { ok: false, error: `Out of stock: ${product.slug}` },
        { status: 422 }
      );
    }
    const unitPrice = effectivePrice(product);
    subtotal += unitPrice * item.qty;
    lineItems.push({
      productId: product.id,
      name: product.name[parsed.data.locale] ?? product.name.en,
      price: unitPrice,
      qty: item.qty,
    });
  }

  // Coupon (validated server-side; never trust a client-computed discount)
  let discount = 0;
  let appliedCoupon: string | null = null;
  const rawCode = parsed.data.couponCode?.trim();
  if (rawCode) {
    const result = await validateCoupon(rawCode, subtotal);
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
    }
    discount = result.discount;
    appliedCoupon = result.code;
  }

  const shipping = computeShipping(settings, subtotal - discount, parsed.data.country);
  const total = Math.max(0, subtotal - discount) + shipping;

  try {
    // Ensure unique ref
    let ref = makeRef();
    let exists = await db.order.findUnique({ where: { ref } });
    while (exists) {
      ref = makeRef();
      exists = await db.order.findUnique({ where: { ref } });
    }

    const order = await db.order.create({
      data: {
        ref,
        email: parsed.data.email,
        name: parsed.data.name,
        address: parsed.data.address,
        houseNumber: parsed.data.houseNumber || null,
        city: parsed.data.city,
        postalCode: parsed.data.postalCode,
        country: parsed.data.country,
        subtotal,
        discount,
        couponCode: appliedCoupon,
        shippingCost: shipping,
        total,
        // No online payment configured yet → keep the email-flow behaviour.
        status: isMollieConfigured() ? "pending_payment" : "pending",
        locale: parsed.data.locale,
        items: { create: lineItems },
      },
      include: { items: true },
    });

    // Count the coupon use once the order exists.
    if (appliedCoupon) await redeemCoupon(appliedCoupon);

    // If Mollie is configured, create a payment and hand back its hosted
    // checkout URL. The client redirects there; the payment is confirmed by
    // the webhook (/api/webhooks/mollie), never by the browser redirect.
    if (isMollieConfigured()) {
      try {
        const origin = baseUrl(req);
        const payment = await getMollie().payments.create({
          amount: eur(total),
          description: `Loboratorium order ${order.ref}`,
          redirectUrl: `${origin}/order/${order.ref}`,
          webhookUrl: `${origin}/api/webhooks/mollie`,
          metadata: { orderId: order.id, ref: order.ref },
        });

        await db.order.update({
          where: { id: order.id },
          data: { paymentId: payment.id, paymentStatus: payment.status },
        });

        const checkoutUrl = payment.getCheckoutUrl();
        return NextResponse.json(
          { ok: true, ref: order.ref, id: order.id, checkoutUrl },
          { status: 201 }
        );
      } catch (err) {
        console.error("[orders] mollie payment failed:", err);
        // Roll the order back to the manual flow rather than losing it.
        await db.order.update({
          where: { id: order.id },
          data: { status: "pending" },
        });
        return NextResponse.json(
          { ok: false, error: "Could not start payment. Please try again." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true, ref: order.ref, id: order.id }, { status: 201 });
  } catch (err) {
    console.error("[orders] create failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not place order. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "orders" });
}
