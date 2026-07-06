import { GoogleGenAI } from "@google/genai";

export type Localized = { en: string; nl: string; fr: string };

export type ProductDraft = {
  name: Localized;
  description: Localized;
};

export type SeoDraft = {
  metaTitle: Localized;
  metaDescription: Localized;
  imageAlt: Localized;
};

export class GeminiNotConfiguredError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not set. Add it to .env to enable AI features.");
    this.name = "GeminiNotConfiguredError";
  }
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

function client(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GeminiNotConfiguredError();
  return new GoogleGenAI({ apiKey });
}

/** Run a prompt and return raw text. */
async function run(prompt: string): Promise<string> {
  const response = await client().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text?.trim() ?? "";
}

/** Parse a JSON object out of a model response (tolerates ``` fences). */
function parseJson<T>(text: string): T {
  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // last resort: grab the first {...} block
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]) as T;
    throw new Error("Gemini returned an unexpected response. Please try again.");
  }
}

function asText(v: Localized | string): string {
  return typeof v === "string" ? v : v.en || v.nl || v.fr || "";
}

/* ---- Product copy ------------------------------------------------------- */

export async function draftProductCopy(input: {
  name?: string;
  category: string;
  material?: string;
  dimensions?: string;
  notes?: string;
  tone?: string;
  length?: "short" | "medium";
}): Promise<ProductDraft> {
  const facts = [
    input.name ? `Working name: ${input.name}` : null,
    `Category: ${input.category}`,
    input.material ? `Material: ${input.material}` : null,
    input.dimensions ? `Dimensions: ${input.dimensions}` : null,
    input.notes ? `Notes from the shop owner: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const tone = input.tone?.trim() || "warm, concrete and specific";
  const length =
    input.length === "medium" ? "2-3 sentences" : "1-2 sentences";

  const prompt = `You are writing product copy for a small custom 3D-printing studio's webshop.
Given these facts about a 3D-printed product:

${facts}

Write a short, appealing product name and a ${length} description in English, Dutch and French.
Tone: ${tone}. Make the Dutch and French read naturally (not literal translations), mention finish/material where natural.
Respond with ONLY minified JSON in this exact shape, no markdown, no commentary:
{"name":{"en":"...","nl":"...","fr":"..."},"description":{"en":"...","nl":"...","fr":"..."}}`;

  const parsed = parseJson<ProductDraft>(await run(prompt));
  return {
    name: { en: parsed.name.en, nl: parsed.name.nl, fr: parsed.name.fr },
    description: {
      en: parsed.description.en,
      nl: parsed.description.nl,
      fr: parsed.description.fr,
    },
  };
}

/* ---- SEO ---------------------------------------------------------------- */

export async function draftSeo(input: {
  name: Localized | string;
  description: Localized | string;
  category: string;
}): Promise<SeoDraft> {
  const prompt = `You are an SEO expert for a custom 3D-printing studio's webshop.
Product name: ${asText(input.name)}
Description: ${asText(input.description)}
Category: ${input.category}

For English, Dutch and French, write:
- metaTitle: <= 60 characters, includes the product and "3D printed".
- metaDescription: <= 155 characters, compelling, includes a subtle call to action.
- imageAlt: a concise, descriptive alt text for the product photo.
Make Dutch and French natural, not literal translations.
Respond with ONLY minified JSON, no markdown:
{"metaTitle":{"en":"","nl":"","fr":""},"metaDescription":{"en":"","nl":"","fr":""},"imageAlt":{"en":"","nl":"","fr":""}}`;

  return parseJson<SeoDraft>(await run(prompt));
}

/* ---- Admin insights ----------------------------------------------------- */

export async function generateInsights(context: string): Promise<string> {
  const prompt = `You are a concise retail analyst for a custom 3D-printing studio.
Here is the current shop data:

${context}

Give the owner a short, practical briefing in Markdown with these sections:
### Summary
### Restock suggestions
### Pricing & promotion ideas
### Follow-ups
Be specific and reference the actual numbers/products above. Keep it under ~250 words. Do not invent data.`;
  return run(prompt);
}

/* ---- Support chatbot ---------------------------------------------------- */

export type ChatMessage = { role: "user" | "model"; text: string };

export async function chatReply(input: {
  messages: ChatMessage[];
  context: string;
  locale?: string;
}): Promise<string> {
  const lang =
    input.locale === "nl" ? "Dutch" : input.locale === "fr" ? "French" : "English";

  const systemInstruction = `You are the friendly support assistant for Loboratorium, a custom 3D-printing studio and webshop based in Belgium.
Answer customer questions about products, materials, shipping, custom orders and the ordering process.
Use ONLY the context below — do not invent products, prices, materials or policies. If something isn't covered, say you're not sure and point them to the quote form (/quote) or to email.
Keep replies short and helpful (2-4 sentences). Be warm and concrete. Reply in ${lang}.

CONTEXT:
${input.context}`;

  const contents = input.messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const response = await client().models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: { systemInstruction },
  });
  return response.text?.trim() ?? "";
}

/* ---- Quote reply -------------------------------------------------------- */

export async function draftQuoteReply(input: {
  name: string;
  projectType: string;
  quantity?: string | null;
  budget?: string | null;
  message: string;
  locale?: string;
}): Promise<string> {
  const lang =
    input.locale === "nl" ? "Dutch" : input.locale === "fr" ? "French" : "English";
  const prompt = `You are the friendly owner of a custom 3D-printing studio replying to a quote request by email.
Write a warm, professional reply in ${lang} to this enquiry. Acknowledge specifics, ask any clarifying questions needed to quote accurately (files, material, finish, deadline), and give a clear next step. Do not invent a price. Sign off as "The Loboratorium team". Return only the email body, no subject line.

Enquiry:
Name: ${input.name}
Project type: ${input.projectType}
Quantity: ${input.quantity || "not specified"}
Budget: ${input.budget || "not specified"}
Message: ${input.message}`;
  return run(prompt);
}
