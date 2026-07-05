"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LocalizedText = { en: string; nl: string; fr: string };

export type ProductFormData = {
  id?: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  badge: string;
  stock: number;
  modelUrl: string;
  material: LocalizedText;
  dimensions: string;
  layerHeight: string;
  finishing: LocalizedText;
  name: LocalizedText;
  description: LocalizedText;
};

const EMPTY: ProductFormData = {
  slug: "",
  price: 0,
  category: "decor",
  image: "",
  badge: "",
  stock: 0,
  modelUrl: "",
  material: { en: "", nl: "", fr: "" },
  dimensions: "",
  layerHeight: "",
  finishing: { en: "", nl: "", fr: "" },
  name: { en: "", nl: "", fr: "" },
  description: { en: "", nl: "", fr: "" },
};

export function ProductForm({ initial }: { initial?: ProductFormData }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [form, setForm] = useState<ProductFormData>(initial ?? EMPTY);
  const [aiNotes, setAiNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setLocalized = (
    field: "material" | "finishing" | "name" | "description",
    locale: keyof LocalizedText,
    value: string
  ) => setForm((f) => ({ ...f, [field]: { ...f[field], [locale]: value } }));

  const draftWithGemini = async () => {
    setDrafting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.en,
          category: form.category,
          material: form.material.en,
          dimensions: form.dimensions,
          notes: aiNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Gemini request failed.");
      setForm((f) => ({ ...f, name: data.name, description: data.description }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not draft with Gemini.");
    } finally {
      setDrafting(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(
        isNew ? "/api/admin/products" : `/api/admin/products/${form.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Save failed.");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!form.id) return;
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${form.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Delete failed.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="modular-planter" />
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["decor", "desk", "kitchen", "tech"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Price (EUR)</Label>
          <Input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Stock</Label>
          <Input
            type="number"
            value={form.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Badge</Label>
          <Select value={form.badge || "none"} onValueChange={(v) => set("badge", v === "none" ? "" : v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="limited">Limited</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Image path</Label>
          <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/images/product-x.png" />
        </div>
        <div className="space-y-1.5">
          <Label>Dimensions</Label>
          <Input value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} placeholder="120 × 120 × 110 mm" />
        </div>
        <div className="space-y-1.5">
          <Label>Layer height</Label>
          <Input value={form.layerHeight} onChange={(e) => set("layerHeight", e.target.value)} placeholder="0.20 mm" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>3D model URL (.glb) — leave blank to show the photo instead</Label>
          <Input value={form.modelUrl} onChange={(e) => set("modelUrl", e.target.value)} placeholder="/models/product-x.glb" />
        </div>
      </div>

      {/* Material / finishing per locale */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(["en", "nl", "fr"] as const).map((locale) => (
          <div key={locale} className="space-y-1.5">
            <Label className="uppercase">{locale} material</Label>
            <Input
              value={form.material[locale]}
              onChange={(e) => setLocalized("material", locale, e.target.value)}
            />
          </div>
        ))}
        {(["en", "nl", "fr"] as const).map((locale) => (
          <div key={locale} className="space-y-1.5">
            <Label className="uppercase">{locale} finishing</Label>
            <Input
              value={form.finishing[locale]}
              onChange={(e) => setLocalized("finishing", locale, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* AI drafting */}
      <div className="rounded-2xl border border-dashed border-brand-accent/40 bg-brand-accent/5 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Sparkles className="size-4 text-brand-accent" />
          Draft name & description with Gemini
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Give it a few keywords (or leave blank to riff on the material/category above) and it
          will draft the product name + description in English, Dutch and French.
        </p>
        <Textarea
          value={aiNotes}
          onChange={(e) => setAiNotes(e.target.value)}
          placeholder="e.g. hexagonal desk tray, snap-together, holds pens and cards"
          rows={2}
          className="mt-2"
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-2"
          disabled={drafting}
          onClick={draftWithGemini}
        >
          {drafting ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Draft with Gemini
        </Button>
      </div>

      {/* Name / description per locale */}
      <div className="space-y-4">
        {(["en", "nl", "fr"] as const).map((locale) => (
          <div key={locale} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr]">
            <div className="space-y-1.5">
              <Label className="uppercase">{locale} name</Label>
              <Input
                value={form.name[locale]}
                onChange={(e) => setLocalized("name", locale, e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="uppercase">{locale} description</Label>
              <Textarea
                value={form.description[locale]}
                onChange={(e) => setLocalized("description", locale, e.target.value)}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          {isNew ? "Create product" : "Save changes"}
        </Button>
        {!isNew ? (
          <Button variant="outline" className="text-destructive" onClick={remove} disabled={saving}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
}
