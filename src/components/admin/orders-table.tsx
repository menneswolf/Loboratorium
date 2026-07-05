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
  items: OrderItem[];
  createdAt: string | Date;
};

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [rows, setRows] = useState(orders);

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
