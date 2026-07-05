import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  company: z.string().max(120).optional().or(z.literal("")),
  projectType: z.string().min(2).max(80),
  quantity: z.string().max(60).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more about your project").max(3000),
  fileUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
});

export async function POST(req: Request) {
  const limited = rateLimit(req, "quote");
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: firstError?.message ?? "Invalid input." },
      { status: 422 }
    );
  }

  try {
    const record = await db.quoteRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        projectType: parsed.data.projectType,
        quantity: parsed.data.quantity || null,
        budget: parsed.data.budget || null,
        message: parsed.data.message,
        fileUrl: parsed.data.fileUrl,
      },
    });

    return NextResponse.json(
      { ok: true, id: record.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[quote] failed to save:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your request. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "quote" });
}
