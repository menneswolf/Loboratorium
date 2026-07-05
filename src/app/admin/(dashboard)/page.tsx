import Link from "next/link";
import { db } from "@/lib/db";
import { ShoppingBag, FileText, Package } from "lucide-react";

export default async function AdminOverviewPage() {
  const [orderCount, quoteCount, productCount, recentOrders, recentQuotes] = await Promise.all([
    db.order.count(),
    db.quoteRequest.count(),
    db.product.count(),
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const cards = [
    { label: "Orders", value: orderCount, href: "/admin/orders", icon: ShoppingBag },
    { label: "Quote requests", value: quoteCount, href: "/admin/quotes", icon: FileText },
    { label: "Products", value: productCount, href: "/admin/products", icon: Package },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-accent/40"
          >
            <c.icon className="size-5 text-brand-accent" />
            <p className="mt-3 font-heading text-3xl font-bold">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-base font-semibold">Recent orders</h2>
          <ul className="mt-3 divide-y divide-border">
            {recentOrders.length === 0 ? (
              <li className="py-3 text-sm text-muted-foreground">No orders yet.</li>
            ) : (
              recentOrders.map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{o.ref}</span>
                  <span className="text-muted-foreground">{o.name}</span>
                  <span className="font-semibold">€{o.total.toFixed(2)}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-base font-semibold">Recent quote requests</h2>
          <ul className="mt-3 divide-y divide-border">
            {recentQuotes.length === 0 ? (
              <li className="py-3 text-sm text-muted-foreground">No quote requests yet.</li>
            ) : (
              recentQuotes.map((q) => (
                <li key={q.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{q.name}</span>
                  <span className="text-muted-foreground">{q.projectType}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
