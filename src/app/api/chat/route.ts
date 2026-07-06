import { NextResponse } from "next/server";
import { z } from "zod";
import { chatReply, isGeminiConfigured, GeminiNotConfiguredError } from "@/lib/gemini";
import { buildChatContext } from "@/lib/chat-context";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  locale: z.enum(["en", "nl", "fr"]).default("en"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        text: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(30),
});

export async function POST(req: Request) {
  const limited = rateLimit(req, "chat");
  if (limited) return limited;

  if (!isGeminiConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Chat is not available right now." },
      { status: 503 }
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 422 });
  }

  try {
    const context = await buildChatContext();
    const reply = await chatReply({
      messages: parsed.data.messages,
      context,
      locale: parsed.data.locale,
    });
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    if (err instanceof GeminiNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 503 });
    }
    console.error("[chat] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
