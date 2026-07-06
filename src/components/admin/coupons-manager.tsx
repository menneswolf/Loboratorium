"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type Coupon = {
  id: string;
  code: string;
  type: string;
  value: number;
  minOrder: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  active: boolean;
};

export function CouponsManager({ initial }: { initial: Coupon[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Coupon[]>(initial);
  const [form, setForm] = useState({
    code: "",
    type: "percent",
    value: "",
    minOrder: "",
    maxUses: "",
    expiresAt: "",
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const create = async () => {
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          type: form.type,
          value: Number(form.value),
          minOrder: form.minOrder ? Number(form.minOrder) : null,
          maxUses: form.maxUses ? Number(form.maxUses) : null,
          expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not create coupon.");
      setRows((r) => [
        { ...data.coupon, expiresAt: data.coupon.expiresAt ?? null },
        ...r,
      ]);
      setForm({ code: "", type: "percent", value: "", minOrder: "", maxUses: "", expiresAt: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create coupon.");
    } finally {
      setCreating(false);
    }
  };

  const toggle = async (id: string, active: boolean) => {
    setRows((r) => r.map((c) => (c.id === id ? { ...c, active } : c)));
    await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    }).catch(() => {});
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    setRows((r) => r.filter((c) => c.id !== id));
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" }).catch(() => {});
  };

  const fmtDiscount = (c: Coupon) =>
    c.type === "percent" ? `${c.value}%` : `€${c.value.toFixed(2)}`;

  return (
    <div className="space-y-8">
      {/* Create */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-heading text-lg font-semibold">New coupon</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Code</Label>
            <Input
              className="uppercase"
              placeholder="WELCOME10"
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed amount (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{form.type === "percent" ? "Percent off" : "Amount off (€)"}</Label>
            <Input
              type="number"
              step="0.01"
              value={form.value}
              onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Min order (€, optional)</Label>
            <Input
              type="number"
              step="0.01"
              value={form.minOrder}
              onChange={(e) => setForm((f) => ({ ...f, minOrder: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Max uses (optional)</Label>
            <Input
              type="number"
              value={form.maxUses}
              onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Expires (optional)</Label>
            <Input
              type="date"
              value={form.expiresAt}
              onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
            />
          </div>
        </div>
        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
        <Button className="mt-3" onClick={create} disabled={creating || !form.code || !form.value}>
          {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Create coupon
        </Button>
      </div>

      {/* List */}
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No coupons yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min order</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.code}</TableCell>
                  <TableCell>{fmtDiscount(c)}</TableCell>
                  <TableCell>{c.minOrder != null ? `€${c.minOrder.toFixed(2)}` : "—"}</TableCell>
                  <TableCell>
                    {c.usedCount}
                    {c.maxUses != null ? ` / ${c.maxUses}` : ""}
                  </TableCell>
                  <TableCell>
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={c.active} onCheckedChange={(v) => toggle(c.id, v)} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => remove(c.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
