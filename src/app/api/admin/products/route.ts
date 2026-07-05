import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const localizedText = z.object({ en: z.string(), nl: z.string(), fr: z.string() });

const productSchema = z.object({
  slug: z.string().min(1),
  price: z.number().min(0),
  category: z.enum(["decor", "desk", "kitchen", "tech"]),
  image: z.string().min(1),
  badge: z.string().optional(),
  stock: z.number().int().min(0),
  modelUrl: z.string().optional(),
  material: localizedText,
  dimensions: z.string(),
  layerHeight: z.string(),
  finishing: localizedText,
  name: localizedText,
  description: localizedText,
});

export async function GET() {
  const products = await db.product.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: Request) {
  const parsed = productSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid product." },
      { status: 422 }
    );
  }

  try {
    const { badge, modelUrl, ...rest } = parsed.data;
    const product = await db.product.create({
      data: { ...rest, badge: badge || null, modelUrl: modelUrl || null },
    });
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (err) {
    console.error("[admin/products] create failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not create product (slug may already be in use)." },
      { status: 500 }
    );
  }
}
