/* =============================================================================
 *  ╔═══════════════════════════════════════════════════════════════════════════╗
 *  ║                       LOBORATORIUM — DESIGN FILE                          ║
 *  ║          THE SINGLE SOURCE OF TRUTH FOR YOUR BRAND                        ║
 *  ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 *  👋  HI! This is the ONLY file you need to touch to rebrand your whole site.
 *
 *  Change your logo, colors, fonts, copy, contact info and nav here, and every
 *  page updates automatically. You do NOT need to edit any other file.
 *
 *  ── QUICK GUIDE ──────────────────────────────────────────────────────────────
 *   • LOGO      →  drop your file in /public  and set `logo.src` below
 *   • COLORS    →  edit the hex values in `colors` (accent drives everything)
 *   • FONTS     →  pick from the preset keys in `fonts` (Space Grotesk, Syne,
 *                  Sora, Inter, Plus Jakarta Sans, JetBrains Mono)
 *   • COPY      →  edit the text in `content`
 *   • CONTACT   →  edit `contact`
 *  ───────────────────────────────────────────────────────────────────────────
 * ========================================================================== */

export type FontKey =
  | "space-grotesk"
  | "syne"
  | "sora"
  | "inter"
  | "plus-jakarta-sans"
  | "jetbrains-mono";

export const brand = {
  /* ────────────────────────────────────────────────────────────────────────
   *  IDENTITY
   * ──────────────────────────────────────────────────────────────────────── */
  name: "Loboratorium",
  tagline: "Custom 3D Printing Studio",
  description:
    "Loboratorium is a custom 3D printing studio crafting bespoke parts, prototypes and production runs for makers, brands and businesses.",

  /* ────────────────────────────────────────────────────────────────────────
   *  LOGO
   *  • Drop your logo file in /public (e.g. /public/logo.svg)
   *  • Set `src` to the path. Use `alt` for accessibility.
   *  • You can also set `text` to show a wordmark next to the mark.
   * ──────────────────────────────────────────────────────────────────────── */
  logo: {
    src: "/loboratorium-mark.svg",
    alt: "Loboratorium logo",
    // A short wordmark shown next to the mark. Set to "" to hide.
    text: "Loboratorium",
    // width/height of the mark itself (the wordmark scales with type)
    width: 36,
    height: 36,
  },

  /* ────────────────────────────────────────────────────────────────────────
   *  COLORS  🎨
   *  These flow into CSS variables and power every button, accent, gradient
   *  and glow on the site. Change a hex here → the whole site updates.
   *
   *  `accent`     = primary brand color (buttons, highlights, glows)
   *  `accent2`    = secondary color for gradients & depth
   *  `surface`    = base background (use a very dark tone for the sleek look)
   *  `surfaceAlt` = slightly lighter panels/cards
   *  `ink`        = main text color
   *  `muted`      = secondary text color
   *  ──────────────────────────────────────────────────────────────────────── */
  colors: {
    accent: "#15803d",      // green — buttons, highlights
    accent2: "#0d9488",     // teal-green for gradients & glows
    accentSoft: "#16a34a",  // mid green
    surface: "#f6f8f4",     // light, soft off-white background
    surfaceAlt: "#ffffff",  // cards / panels
    surfaceAlt2: "#e9efe6", // elevated / secondary panels
    ink: "#15241c",         // primary text (dark green-black)
    muted: "#54615a",       // secondary text
    border: "rgba(21,36,28,0.12)",
  },

  /* ────────────────────────────────────────────────────────────────────────
   *  FONTS  🔤
   *  Pick from the preset keys: "space-grotesk", "syne", "sora",
   *  "inter", "plus-jakarta-sans", "jetbrains-mono".
   *  • `heading`  = used for headlines & the wordmark
   *  • `body`     = used for paragraphs & UI
   * ──────────────────────────────────────────────────────────────────────── */
  fonts: {
    heading: "space-grotesk" as FontKey,
    body: "inter" as FontKey,
  },

  /* ────────────────────────────────────────────────────────────────────────
   *  CONTACT  📫
   * ──────────────────────────────────────────────────────────────────────── */
  contact: {
    email: "hello@loboratorium.be",
    phone: "+32 470 00 00 00",
    location: "Belgium · Worldwide shipping",
    responseTime: "We reply within 24 hours",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/loboratorium", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/company/loboratorium", icon: "linkedin" },
    { label: "Email", href: "mailto:hello@loboratorium.be", icon: "mail" },
  ],

  /* ────────────────────────────────────────────────────────────────────────
   *  NAVIGATION
   *  Nav labels are translated — they live in src/config/translations.ts
   *  (under each language's `nav` array). Only the section anchors matter
   *  here as a reference of which sections exist.
   * ──────────────────────────────────────────────────────────────────────── */
} as const;

export type Brand = typeof brand;

/* NOTE: All user-facing copy (including nav labels) now lives in
 * src/config/translations.ts so it can be translated into every language.
 * The `Content` type is also exported from there.
 */

