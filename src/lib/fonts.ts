/* =============================================================================
 *  FONT REGISTRY
 *  ---------------------------------------------------------------------------
 *  Loads a curated set of Google Fonts and exposes them by key. The active
 *  fonts are chosen in src/config/brand.ts → brand.fonts.{heading,body}.
 *
 *  Want a font that isn't here? Just add it with next/font/google, give it a
 *  key, and pick that key in the brand config. Nothing else needs to change.
 * ========================================================================== */

import {
  Space_Grotesk,
  Syne,
  Sora,
  Inter,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import type { FontKey } from "@/config/brand";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Map of every loaded font's CSS variable, keyed by FontKey.
 * Used to resolve the chosen heading/body font into actual CSS variables.
 */
export const fontVariables: Record<FontKey, string> = {
  "space-grotesk": spaceGrotesk.variable,
  syne: syne.variable,
  sora: sora.variable,
  inter: inter.variable,
  "plus-jakarta-sans": plusJakartaSans.variable,
  "jetbrains-mono": jetbrainsMono.variable,
};

/** CSS variable name (without the leading --) for each font key. */
export const fontVarNames: Record<FontKey, string> = {
  "space-grotesk": "font-space-grotesk",
  syne: "font-syne",
  sora: "font-sora",
  inter: "font-inter",
  "plus-jakarta-sans": "font-plus-jakarta-sans",
  "jetbrains-mono": "font-jetbrains-mono",
};

/**
 * The full string of every font variable — apply this on <html> or <body>
 * so all fonts are available, then pick the active ones via brand config.
 */
export const allFontVariables = Object.values(fontVariables).join(" ");

/** Resolve a FontKey to its CSS font-family stack for use in inline styles. */
export function fontFamilyStack(key: FontKey): string {
  const varName = fontVarNames[key];
  return `var(--${varName}), ui-sans-serif, system-ui, sans-serif`;
}
