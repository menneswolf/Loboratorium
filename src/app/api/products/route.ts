import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    console.error("[products] failed to list:", err);
    return NextResponse.json(
      { ok: false, error: "Could not load products." },
      { status: 500 }
    );
  }
}
