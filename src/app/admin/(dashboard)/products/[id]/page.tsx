import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm, type ProductFormData } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await db.product.findUnique({ where: { id } });
  if (!p) notFound();

  const initial: ProductFormData = {
    id: p.id,
    slug: p.slug,
    price: p.price,
    category: p.category,
    image: p.image,
    badge: p.badge ?? "",
    stock: p.stock,
    modelUrl: p.modelUrl ?? "",
    material: p.material as ProductFormData["material"],
    dimensions: p.dimensions,
    layerHeight: p.layerHeight,
    finishing: p.finishing as ProductFormData["finishing"],
    name: p.name as ProductFormData["name"],
    description: p.description as ProductFormData["description"],
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Edit product</h1>
      <div className="mt-6">
        <ProductForm initial={initial} />
      </div>
    </div>
  );
}
