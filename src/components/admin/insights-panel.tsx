"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Stats = {
  products: number;
  paidOrders: number;
  revenue: number;
  recentOrders: number;
  openQuotes: number;
  lowStock: number;
};

export function InsightsPanel() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/insights");
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not generate insights.");
      setInsights(data.insights);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {stats ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Products" value={stats.products} />
          <Stat label="Paid orders" value={stats.paidOrders} />
          <Stat label="Revenue" value={`€${stats.revenue.toFixed(0)}`} />
          <Stat label="Orders / 30d" value={stats.recentOrders} />
          <Stat label="Open quotes" value={stats.openQuotes} />
          <Stat label="Low stock" value={stats.lowStock} />
        </div>
      ) : null}

      {!insights ? (
        <Button onClick={generate} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Generate insights
        </Button>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="prose prose-invert prose-sm max-w-none prose-headings:font-heading prose-headings:text-brand-accent">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
            Regenerate
          </Button>
        </div>
      )}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-heading text-xl font-bold text-foreground">{value}</p>
    </div>
  );
}
