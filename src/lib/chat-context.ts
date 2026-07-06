import { getAllProducts, } from "@/lib/products";
import { effectivePrice, isOnSale } from "@/config/products";
import { getSettings } from "@/lib/settings";
import { translations } from "@/config/translations";

/* Builds a concise, grounded context string for the support chatbot from the
 * live catalogue, shipping settings and the site's own FAQ. Cached briefly so
 * every message doesn't re-query. */

let cache: { text: string; at: number } | null = null;
const TTL_MS = 60_000;

export async function buildChatContext(): Promise<string> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.text;

  const [products, settings] = await Promise.all([getAllProducts(), getSettings()]);

  const productLines = products.map((p) => {
    const price = effectivePrice(p);
    const sale = isOnSale(p) ? ` (on sale from €${p.price.toFixed(2)})` : "";
    return `- ${p.name.en} — €${price.toFixed(2)}${sale}, category ${p.category}, material ${p.specs.material.en}, ${p.stock > 0 ? "in stock" : "out of stock"}. ${p.description.en}`;
  });

  const shipping =
    settings.freeShippingThreshold != null
      ? `Shipping is €${settings.shippingFlatRate.toFixed(2)}, free over €${settings.freeShippingThreshold.toFixed(2)}.`
      : `Shipping is €${settings.shippingFlatRate.toFixed(2)}.`;

  const faq = translations.en.faq.items
    .map((i) => `Q: ${i.q}\nA: ${i.a}`)
    .join("\n");

  const text = `Studio: Loboratorium — a custom 3D-printing studio in Belgium. We print, finish and ship products, take custom orders, and work with brands.
Prices include ${settings.vatRate}% VAT. ${shipping} We ship worldwide with tracking; local pickup in Belgium by appointment.
For anything custom (prototypes, spare parts, personalised pieces, low-batch production), customers use the quote form at /quote — free, no obligation, reply within 24h.
Contact: use the quote form or email via the site footer.

READY-MADE PRODUCTS (shop at /shop):
${productLines.join("\n")}

FAQ:
${faq}`;

  cache = { text, at: Date.now() };
  return text;
}
