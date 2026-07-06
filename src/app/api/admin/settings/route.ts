import { NextResponse } from "next/server";
import { z } from "zod";
import { getSettings, updateSettings } from "@/lib/settings";

const settingsSchema = z.object({
  storeName: z.string().min(1).max(120).optional(),
  currency: z.string().min(1).max(8).optional(),
  vatRate: z.number().min(0).max(100).optional(),
  shippingFlatRate: z.number().min(0).optional(),
  freeShippingThreshold: z.number().min(0).nullable().optional(),
  shippingRates: z.record(z.string(), z.number().min(0)).nullable().optional(),
  checkoutEnabled: z.boolean().optional(),
});

export async function GET() {
  return NextResponse.json({ ok: true, settings: await getSettings() });
}

export async function PATCH(req: Request) {
  const parsed = settingsSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid settings." },
      { status: 422 }
    );
  }
  try {
    const settings = await updateSettings(parsed.data);
    return NextResponse.json({ ok: true, settings });
  } catch (err) {
    console.error("[admin/settings] update failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save settings." },
      { status: 500 }
    );
  }
}
