import { NextResponse } from "next/server";
import { z } from "zod";
import { draftSeo, GeminiNotConfiguredError } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";

const localized = z.object({ en: z.string(), nl: z.string(), fr: z.string() });
const schema = z.object({
  name: z.union([localized, z.string()]),
  description: z.union([localized, z.string()]),
  category: z.string(),
});

export async function POST(req: Request) {
  const limited = rateLimit(req, "admin-generate");
  if (limited) return limited;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }
  try {
    const seo = await draftSeo(parsed.data);
    return NextResponse.json({ ok: true, ...seo });
  } catch (err) {
    if (err instanceof GeminiNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error("[generate-seo] failed:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "SEO generation failed." },
      { status: 500 }
    );
  }
}
