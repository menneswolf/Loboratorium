import { db } from "@/lib/db";
import { QuotesList } from "@/components/admin/quotes-list";

export default async function AdminQuotesPage() {
  const quotes = await db.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Quote requests</h1>
      <p className="mt-1 text-sm text-muted-foreground">{quotes.length} total</p>
      <div className="mt-6">
        <QuotesList quotes={quotes} />
      </div>
    </div>
  );
}
