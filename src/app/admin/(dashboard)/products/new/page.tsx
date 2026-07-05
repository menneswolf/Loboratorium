import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">New product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
