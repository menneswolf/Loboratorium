import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { countryCode } from "@/lib/country";

/* =============================================================================
 *  STORE SETTINGS
 *  ---------------------------------------------------------------------------
 *  Admin-editable, store-wide configuration (single "store" row). Falls back to
 *  sensible defaults if the row doesn't exist yet. Prices are VAT-inclusive.
 * ========================================================================== */

export type StoreSettings = {
  storeName: string;
  currency: string;
  vatRate: number; // percent, prices are VAT-inclusive
  shippingFlatRate: number;
  freeShippingThreshold: number | null;
  shippingRates: Record<string, number> | null; // per ISO country code, e.g. { NL: 8.5 }
  checkoutEnabled: boolean;
};

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Loboratorium",
  currency: "EUR",
  vatRate: 21,
  shippingFlatRate: 6.5,
  freeShippingThreshold: 150,
  shippingRates: null,
  checkoutEnabled: true,
};

export async function getSettings(): Promise<StoreSettings> {
  const row = await db.storeSetting.findUnique({ where: { id: "store" } });
  if (!row) return DEFAULT_SETTINGS;
  return {
    storeName: row.storeName,
    currency: row.currency,
    vatRate: row.vatRate,
    shippingFlatRate: row.shippingFlatRate,
    freeShippingThreshold: row.freeShippingThreshold,
    shippingRates: (row.shippingRates as Record<string, number> | null) ?? null,
    checkoutEnabled: row.checkoutEnabled,
  };
}

export async function updateSettings(
  data: Partial<StoreSettings>
): Promise<StoreSettings> {
  const { shippingRates, ...rest } = data;
  // Nullable JSON columns need Prisma's DbNull sentinel, not a plain null.
  const payload: Prisma.StoreSettingUpdateInput = { ...rest };
  if (shippingRates !== undefined) {
    payload.shippingRates =
      shippingRates === null ? Prisma.DbNull : shippingRates;
  }
  await db.storeSetting.upsert({
    where: { id: "store" },
    create: { id: "store", ...payload } as Prisma.StoreSettingCreateInput,
    update: payload,
  });
  return getSettings();
}

/** Shipping cost for a given subtotal + destination, per the store settings. */
export function computeShipping(
  settings: StoreSettings,
  subtotal: number,
  country: string
): number {
  if (
    settings.freeShippingThreshold != null &&
    subtotal >= settings.freeShippingThreshold
  ) {
    return 0;
  }
  const cc = countryCode(country);
  const override = settings.shippingRates?.[cc];
  if (typeof override === "number") return override;
  return settings.shippingFlatRate;
}

/** Split a VAT-inclusive gross amount into net + VAT parts. */
export function vatBreakdown(gross: number, vatRate: number) {
  const net = gross / (1 + vatRate / 100);
  return { net, vat: gross - net };
}
