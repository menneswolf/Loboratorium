import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateInsights, GeminiNotConfiguredError } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const limited = rateLimit(req, "admin-generate");
  if (limited) return limited;

  // Gather the shop data the analyst should reason over.
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [products, paidOrders, recentOrders, openQuotes] = await Promise.all([
    db.product.findMany({ select: { slug: true, price: true, salePrice: true, stock: true, category: true } }),
    db.order.findMany({ where: { status: { in: ["paid", "processing", "shipped", "delivered"] } }, select: { total: true, items: true, createdAt: true } }),
    db.order.count({ where: { createdAt: { gte: since } } }),
    db.quoteRequest.count(),
  ]);

  const revenue = paidOrders.reduce((s, o) => s + o.total, 0);
  const unitsByProduct = new Map<string, number>();
  for (const o of paidOrders) {
    for (const it of o.items as { name?: string; qty?: number }[] ?? []) {
      if (it?.name) unitsByProduct.set(it.name, (unitsByProduct.get(it.name) ?? 0) + (it.qty ?? 0));
    }
  }
  const lowStock = products.filter((p) => p.stock <= 5).map((p) => `${p.slug} (stock ${p.stock})`);
  const onSale = products.filter((p) => p.salePrice != null).map((p) => p.slug);

  const context = [
    `Products: ${products.length}`,
    `Total paid orders: ${paidOrders.length}, total revenue: €${revenue.toFixed(2)}`,
    `Orders in last 30 days: ${recentOrders}`,
    `Open quote requests: ${openQuotes}`,
    `Low stock (<=5): ${lowStock.length ? lowStock.join(", ") : "none"}`,
    `Currently on sale: ${onSale.length ? onSale.join(", ") : "none"}`,
    `Catalogue: ${products.map((p) => `${p.slug} €${p.price}${p.salePrice != null ? ` (sale €${p.salePrice})` : ""} [${p.category}] stock ${p.stock}`).join("; ")}`,
  ].join("\n");

  try {
    const insights = await generateInsights(context);
    return NextResponse.json({
      ok: true,
      insights,
      stats: {
        products: products.length,
        paidOrders: paidOrders.length,
        revenue,
        recentOrders,
        openQuotes,
        lowStock: lowStock.length,
      },
    });
  } catch (err) {
    if (err instanceof GeminiNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error("[insights] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not generate insights." }, { status: 500 });
  }
}
