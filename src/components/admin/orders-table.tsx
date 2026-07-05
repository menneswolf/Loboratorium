"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type OrderItem = { id: string; name: string; price: number; qty: number };
type Order = {
  id: string;
  ref: string;
  email: string;
  name: string;
  city: string;
  country: string;
  total: number;
  status: string;
  locale: string;
  paymentStatus?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  labelUrl?: string | null;
  items: OrderItem[];
  createdAt: string | Date;
};

const STATUSES = [
  "pending",
  "pending_payment",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "failed",
  "expired",
];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [rows, setRows] = useState(orders);
  const [labelBusy, setLabelBusy] = useState<string | null>(null);
  const [labelError, setLabelError] = useState<Record<string, string>>({});

  const updateStatus = async (id: string, status: string) => {
    setRows((r) => r.map((o) => (o.id === id ? { ...o, status } : o)));
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setRows(orders); // revert on failure
    }
  };

  const createLabel = async (id: string) => {
    setLabelBusy(id);
    setLabelError((e) => ({ ...e, [id]: "" }));
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Could not create label.");
      }
      const o = data.order;
      setRows((r) =>
        r.map((row) =>
          row.id === id
            ? {
                ...row,
                status: o.status ?? row.status,
                trackingNumber: o.trackingNumber,
                trackingUrl: o.trackingUrl,
                labelUrl: o.labelUrl,
              }
            : row
        )
      );
    } catch (err) {
      setLabelError((e) => ({
        ...e,
        [id]: err instanceof Error ? err.message : "Could not create label.",
      }));
    } finally {
      setLabelBusy(null);
    }
  };

  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ref</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">{o.ref}</TableCell>
              <TableCell>
                <div>{o.name}</div>
                <div className="text-xs text-muted-foreground">{o.email}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{o.items.reduce((n, i) => n + i.qty, 0)} items</Badge>
              </TableCell>
              <TableCell className="font-semibold">€{o.total.toFixed(2)}</TableCell>
              <TableCell>
                <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {o.paymentStatus ? (
                  <div className="mt-1 text-xs text-muted-foreground">Mollie: {o.paymentStatus}</div>
                ) : null}
              </TableCell>
              <TableCell>
                {o.trackingUrl ? (
                  <a
                    href={o.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-brand-accent hover:underline"
                  >
                    {o.trackingNumber || "Track"}
                  </a>
                ) : o.labelUrl ? (
                  <a
                    href={o.labelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-brand-accent hover:underline"
                  >
                    Label
                  </a>
                ) : (
                  <div className="space-y-1">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={labelBusy === o.id}
                      onClick={() => createLabel(o.id)}
                    >
                      {labelBusy === o.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : null}
                      Create label
                    </Button>
                    {labelError[o.id] ? (
                      <p className="max-w-[12rem] text-xs text-destructive">
                        {labelError[o.id]}
                      </p>
                    ) : null}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
