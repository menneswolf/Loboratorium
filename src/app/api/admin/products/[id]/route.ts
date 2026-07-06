import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productInputSchema, toPrismaProductData } from "@/lib/product-input";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = productInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid product." },
      { status: 422 }
    );
  }

  try {
    const product = await db.product.update({
      where: { id },
      data: toPrismaProductData(parsed.data),
    });
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    console.error("[admin/products] update failed:", err);
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await db.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/products] delete failed:", err);
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }
}
