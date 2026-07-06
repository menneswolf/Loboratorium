import { InsightsPanel } from "@/components/admin/insights-panel";

export const dynamic = "force-dynamic";

export default function InsightsPage() {
  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-bold sm:text-3xl">AI insights</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        A quick AI briefing on your orders, stock and pricing.
      </p>
      <InsightsPanel />
    </div>
  );
}
