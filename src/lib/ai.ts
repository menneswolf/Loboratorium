import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

/* =============================================================================
 *  AI PROVIDER LAYER
 *  ---------------------------------------------------------------------------
 *  A single entry point for every AI feature (product copy, SEO, insights,
 *  quote replies, support chat). Supports Gemini and Groq — both have free
 *  tiers. Which one runs is controlled by AI_PROVIDER; whichever keys are
 *  present are tried in order, so if the preferred provider errors (e.g. hits
 *  a free-tier rate limit) the other is used automatically.
 * ========================================================================== */

export type AiMessage = { role: "user" | "model"; text: string };

export class AiNotConfiguredError extends Error {
  constructor() {
    super(
      "No AI provider is configured. Set GEMINI_API_KEY or GROQ_API_KEY to enable AI features."
    );
    this.name = "AiNotConfiguredError";
  }
}

type Provider = "gemini" | "groq";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const geminiKey = () => process.env.GEMINI_API_KEY?.trim() || "";
const groqKey = () => process.env.GROQ_API_KEY?.trim() || "";

export function isAiConfigured(): boolean {
  return Boolean(geminiKey() || groqKey());
}

/** Providers to try, most-preferred first (honours AI_PROVIDER). */
function providerOrder(): Provider[] {
  const available: Provider[] = [];
  if (geminiKey()) available.push("gemini");
  if (groqKey()) available.push("groq");

  const pref = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (pref === "groq" || pref === "gemini") {
    available.sort((a, b) => (a === pref ? -1 : b === pref ? 1 : 0));
  }
  return available;
}

async function callGemini(system: string | undefined, messages: AiMessage[]): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: geminiKey() });
  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  const res = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    ...(system ? { config: { systemInstruction: system } } : {}),
  });
  return res.text?.trim() ?? "";
}

async function callGroq(system: string | undefined, messages: AiMessage[]): Promise<string> {
  const groq = new Groq({ apiKey: groqKey() });
  const msgs: { role: "system" | "user" | "assistant"; content: string }[] = [];
  if (system) msgs.push({ role: "system", content: system });
  for (const m of messages) {
    msgs.push({ role: m.role === "model" ? "assistant" : "user", content: m.text });
  }
  const res = await groq.chat.completions.create({ model: GROQ_MODEL, messages: msgs });
  return res.choices[0]?.message?.content?.trim() ?? "";
}

/** Generate text from a single prompt or a multi-turn conversation. */
export async function generateText(input: {
  system?: string;
  messages?: AiMessage[];
  prompt?: string;
}): Promise<string> {
  const order = providerOrder();
  if (order.length === 0) throw new AiNotConfiguredError();

  const messages: AiMessage[] =
    input.messages ?? [{ role: "user", text: input.prompt ?? "" }];

  let lastErr: unknown;
  for (const provider of order) {
    try {
      return provider === "gemini"
        ? await callGemini(input.system, messages)
        : await callGroq(input.system, messages);
    } catch (err) {
      lastErr = err;
      console.error(
        `[ai] ${provider} failed${order.length > 1 ? ", trying next provider" : ""}:`,
        err instanceof Error ? err.message : err
      );
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("AI request failed.");
}
