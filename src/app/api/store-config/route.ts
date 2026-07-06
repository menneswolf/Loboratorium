import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";
import { isGeminiConfigured } from "@/lib/gemini";

/** Public, read-only store config used by the cart/checkout to show shipping,
 *  VAT and currency that match what the server charges. Exposes only safe
 *  fields (no admin-only data). */
export const dynamic = "force-dynamic";

export async function GET() {
  const s = await getSettings();
  return NextResponse.json({
    ok: true,
    config: {
      currency: s.currency,
      vatRate: s.vatRate,
      shippingFlatRate: s.shippingFlatRate,
      freeShippingThreshold: s.freeShippingThreshold,
      shippingRates: s.shippingRates,
      checkoutEnabled: s.checkoutEnabled,
      chatEnabled: isGeminiConfigured(),
    },
  });
}
