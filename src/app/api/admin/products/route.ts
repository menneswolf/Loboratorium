import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productInputSchema, toPrismaProductData } from "@/lib/product-input";

export async function GET() {
  const products = await db.product.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: Request) {
  const parsed = productInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid product." },
      { status: 422 }
    );
  }

  try {
    const product = await db.product.create({
      data: toPrismaProductData(parsed.data),
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
