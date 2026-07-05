import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="size-4" />
            New product
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const name = (p.name as Record<string, string>).en ?? p.slug;
          return (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-brand-accent/40"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                <Image src={p.image} alt={name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">
                  €{p.price.toFixed(2)} · stock {p.stock}
                  {p.modelUrl ? " · 3D" : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
