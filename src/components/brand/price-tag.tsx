import { localizedPrice, isOnSale, type Product } from "@/config/products";
import type { Locale } from "@/config/translations";
import { cn } from "@/lib/utils";

/** Renders a product price, showing the sale price with the original struck
 *  through when the product is on sale. */
export function PriceTag({
  product,
  locale,
  className,
}: {
  product: Pick<Product, "price" | "salePrice">;
  locale: Locale;
  className?: string;
}) {
  if (isOnSale(product)) {
    return (
      <span className={cn("tabular-nums", className)}>
        <span className="text-brand-accent">
          {localizedPrice(product.salePrice as number, locale)}
        </span>{" "}
        <span className="text-sm font-normal text-muted-foreground line-through">
          {localizedPrice(product.price, locale)}
        </span>
      </span>
    );
  }
  return (
    <span className={cn("tabular-nums", className)}>
      {localizedPrice(product.price, locale)}
    </span>
  );
}
