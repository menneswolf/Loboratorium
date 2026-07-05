import { NextResponse } from "next/server";
import { z } from "zod";
import { draftProductCopy, GeminiNotConfiguredError } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().optional(),
  category: z.string(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const limited = rateLimit(req, "admin-generate");
  if (limited) return limited;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
  }

  try {
    const draft = await draftProductCopy(parsed.data);
    return NextResponse.json({ ok: true, ...draft });
  } catch (err) {
    if (err instanceof GeminiNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 501 });
    }
    console.error("[admin/generate-description] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not draft copy right now. Please try again." },
      { status: 500 }
    );
  }
}
