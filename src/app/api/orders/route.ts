import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getAllProducts } from "@/lib/products";
import { rateLimit } from "@/lib/rate-limit";

const orderSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  address: z.string().min(4).max(300),
  city: z.string().min(2).max(120),
  postalCode: z.string().min(2).max(20),
  country: z.string().min(2).max(120),
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

  // Resolve items against the server-side catalogue to compute the real total.
  // (Never trust prices sent from the client.)
  const products = await getAllProducts();
  const lineItems: { productId: string; name: string; price: number; qty: number }[] = [];
  let total = 0;
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
    const lineTotal = product.price * item.qty;
    total += lineTotal;
    lineItems.push({
      productId: product.id,
      name: product.name[parsed.data.locale] ?? product.name.en,
      price: product.price,
      qty: item.qty,
    });
  }

  // Shipping: free over €150, else €6.50
  const shipping = total >= 150 ? 0 : 6.5;
  total += shipping;

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
        city: parsed.data.city,
        postalCode: parsed.data.postalCode,
        country: parsed.data.country,
        total,
        locale: parsed.data.locale,
        items: { create: lineItems },
      },
      include: { items: true },
    });

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
