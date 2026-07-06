import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";

/* Server-side metadata for each product page (the page itself is a client
 *  component). Uses the admin/AI-managed SEO fields, falling back to the
 *  product name/description. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = product.seo?.metaTitle?.en?.trim() || product.name.en;
  const description =
    product.seo?.metaDescription?.en?.trim() || product.description.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
