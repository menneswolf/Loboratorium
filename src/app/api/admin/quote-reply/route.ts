import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { draftQuoteReply, GeminiNotConfiguredError } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({ id: z.string().min(1) });

export async function POST(req: Request) {
  const limited = rateLimit(req, "admin-generate");
  if (limited) return limited;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }

  const quote = await db.quoteRequest.findUnique({ where: { id: parsed.data.id } });
  if (!quote) {
    return NextResponse.json({ ok: false, error: "Quote not found." }, { status: 404 });
  }

  try {
    const reply = await draftQuoteReply({
      name: quote.name,
      projectType: quote.projectType,
      quantity: quote.quantity,
      budget: quote.budget,
      message: quote.message,
    });
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    if (err instanceof GeminiNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error("[quote-reply] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not draft a reply." }, { status: 500 });
  }
}
