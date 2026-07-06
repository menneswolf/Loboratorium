"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { StoreSettings } from "@/lib/settings";

type RateRow = { code: string; rate: string };

export function SettingsForm({ initial }: { initial: StoreSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [rates, setRates] = useState<RateRow[]>(
    Object.entries(initial.shippingRates ?? {}).map(([code, rate]) => ({
      code,
      rate: String(rate),
    }))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    const shippingRates: Record<string, number> = {};
    for (const r of rates) {
      const code = r.code.trim().toUpperCase();
      const rate = Number(r.rate);
      if (code && !Number.isNaN(rate)) shippingRates[code] = rate;
    }
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: form.storeName,
          currency: form.currency,
          vatRate: Number(form.vatRate),
          shippingFlatRate: Number(form.shippingFlatRate),
          freeShippingThreshold:
            form.freeShippingThreshold === null
              ? null
              : Number(form.freeShippingThreshold),
          shippingRates: Object.keys(shippingRates).length ? shippingRates : null,
          checkoutEnabled: form.checkoutEnabled,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed.");
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Store */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold">Store</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Store name</Label>
            <Input value={form.storeName} onChange={(e) => set("storeName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Input value={form.currency} onChange={(e) => set("currency", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>VAT / BTW rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={form.vatRate}
              onChange={(e) => set("vatRate", Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Prices are VAT-inclusive; this is shown as a breakdown on orders.</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <Label>Checkout enabled</Label>
              <p className="text-xs text-muted-foreground">Turn off to pause new orders.</p>
            </div>
            <Switch
              checked={form.checkoutEnabled}
              onCheckedChange={(v) => set("checkoutEnabled", v)}
            />
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="space-y-4">
        <h2 className="font-heading text-lg font-semibold">Shipping</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Flat rate ({form.currency})</Label>
            <Input
              type="number"
              step="0.01"
              value={form.shippingFlatRate}
              onChange={(e) => set("shippingFlatRate", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Free shipping over ({form.currency})</Label>
            <Input
              type="number"
              step="0.01"
              value={form.freeShippingThreshold ?? ""}
              placeholder="Leave blank to disable"
              onChange={(e) =>
                set(
                  "freeShippingThreshold",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Per-country rates (optional)</Label>
          <p className="text-xs text-muted-foreground">
            Override the flat rate for specific countries (2-letter code, e.g. NL, FR, DE).
          </p>
          {rates.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                className="w-24 uppercase"
                placeholder="NL"
                value={r.code}
                onChange={(e) =>
                  setRates((rs) => rs.map((x, j) => (j === i ? { ...x, code: e.target.value } : x)))
                }
              />
              <Input
                className="w-32"
                type="number"
                step="0.01"
                placeholder="8.50"
                value={r.rate}
                onChange={(e) =>
                  setRates((rs) => rs.map((x, j) => (j === i ? { ...x, rate: e.target.value } : x)))
                }
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRates((rs) => rs.filter((_, j) => j !== i))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRates((rs) => [...rs, { code: "", rate: "" }])}
          >
            <Plus className="size-4" /> Add country rate
          </Button>
        </div>
      </section>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : saved ? <Check className="size-4" /> : null}
          {saved ? "Saved" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
