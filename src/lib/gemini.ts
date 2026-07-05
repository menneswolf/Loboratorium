import { GoogleGenAI } from "@google/genai";

export type ProductDraft = {
  name: { en: string; nl: string; fr: string };
  description: { en: string; nl: string; fr: string };
};

export class GeminiNotConfiguredError extends Error {
  constructor() {
    super("GEMINI_API_KEY is not set. Add it to .env to enable AI-drafted descriptions.");
    this.name = "GeminiNotConfiguredError";
  }
}

export async function draftProductCopy(input: {
  name?: string;
  category: string;
  material?: string;
  dimensions?: string;
  notes?: string;
}): Promise<ProductDraft> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GeminiNotConfiguredError();

  const ai = new GoogleGenAI({ apiKey });

  const facts = [
    input.name ? `Working name: ${input.name}` : null,
    `Category: ${input.category}`,
    input.material ? `Material: ${input.material}` : null,
    input.dimensions ? `Dimensions: ${input.dimensions}` : null,
    input.notes ? `Notes from the shop owner: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const prompt = `You are writing product copy for a small custom 3D-printing studio's webshop.
Given these facts about a 3D-printed product:

${facts}

Write a short, appealing product name and a 1-2 sentence description in English, Dutch and French.
Keep the tone warm, concrete and specific to 3D printing (mention finish/material where natural).
Respond with ONLY minified JSON in this exact shape, no markdown, no commentary:
{"name":{"en":"...","nl":"...","fr":"..."},"description":{"en":"...","nl":"...","fr":"..."}}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text?.trim() ?? "";
  const jsonText = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();

  try {
    const parsed = JSON.parse(jsonText);
    return {
      name: { en: parsed.name.en, nl: parsed.name.nl, fr: parsed.name.fr },
      description: {
        en: parsed.description.en,
        nl: parsed.description.nl,
        fr: parsed.description.fr,
      },
    };
  } catch {
    throw new Error("Gemini returned an unexpected response. Please try again.");
  }
}
