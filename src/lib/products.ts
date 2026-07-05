import { db } from "@/lib/db";
import type { Product } from "@/config/products";
import type { Product as PrismaProduct } from "@prisma/client";

function toProduct(row: PrismaProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    price: row.price,
    category: row.category as Product["category"],
    image: row.image,
    badge: (row.badge as Product["badge"]) ?? undefined,
    stock: row.stock,
    modelUrl: row.modelUrl,
    specs: {
      material: row.material as Product["specs"]["material"],
      dimensions: row.dimensions,
      layerHeight: row.layerHeight,
      finishing: row.finishing as Product["specs"]["finishing"],
    },
    name: row.name as Product["name"],
    description: row.description as Product["description"],
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await db.product.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await db.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await db.product.findUnique({ where: { id } });
  return row ? toProduct(row) : null;
}
