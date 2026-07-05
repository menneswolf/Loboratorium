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
    accent: "#ff6a1a",      // molten orange — filament / heat
    accent2: "#ffb347",     // warm amber for gradients
    accentSoft: "#ff8c3a",
    surface: "#0a0a0b",     // near-black background
    surfaceAlt: "#121214",  // cards / panels
    surfaceAlt2: "#1a1a1e", // elevated panels
    ink: "#f5f5f4",         // primary text
    muted: "#a1a1aa",       // secondary text
    border: "rgba(255,255,255,0.08)",
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
   *  `href` values are anchor links to sections on the single-page site.
   * ──────────────────────────────────────────────────────────────────────── */
  nav: [
    { label: "Custom Orders", href: "#custom-orders" },
    { label: "For Brands", href: "#brands" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

/* ===========================================================================
 *  CONTENT
 *  All the copy on the site lives here so you can tweak wording without
 *  digging into component code.
 * ========================================================================= */
export const content = {
  hero: {
    eyebrow: "Custom 3D printing · Made in Belgium",
    title: "We turn ideas into",
    titleAccent: "tangible things.",
    subtitle:
      "Loboratorium is a custom 3D printing studio for makers, brands and businesses. From a one-off prototype to a branded production run — we print it, finish it, and ship it.",
    primaryCta: { label: "Request a custom quote", href: "#quote" },
    secondaryCta: { label: "Partner with us", href: "#brands" },
    stats: [
      { value: "12k+", label: "Parts printed" },
      { value: "40+", label: "Materials" },
      { value: "96h", label: "Avg. lead time" },
      { value: "30+", label: "Brand partners" },
    ],
  },

  marquee: [
    "FDM", "SLA", "Resin", "PETG", "ABS", "Nylon", "TPU", "Carbon Fiber",
    "PLA", "Resin Casting", "Multi-color", "Prototyping", "Low-batch", "Finishing",
  ],

  customOrders: {
    eyebrow: "Custom orders",
    title: "Bring us your wildest part.",
    subtitle:
      "Send a sketch, a CAD file, or just an idea. We handle design for additive manufacturing, material selection, printing and post-processing — so you get a part that actually works.",
    items: [
      {
        icon: "boxes",
        title: "Prototypes & R&D",
        text: "Iterate fast with functional prototypes that look and feel like the real thing. Perfect for product development and investor demos.",
      },
      {
        icon: "wrench",
        title: "Replacement & spare parts",
        text: "Hard-to-find or discontinued parts recreated from samples or drawings, printed in durable engineering materials.",
      },
      {
        icon: "gift",
        title: "Personalised & bespoke",
        text: "Custom gifts, signage, displays and one-off pieces tailored exactly to your specifications and brand.",
      },
      {
        icon: "factory",
        title: "Low-batch production",
        text: "Skip the mould. Produce 10–500 units of a part economically, with consistent quality and repeatable results.",
      },
      {
        icon: "pen-tool",
        title: "Design for print",
        text: "No CAD? No problem. Our designers optimise or model your part from scratch for clean, reliable prints.",
      },
      {
        icon: "sparkles",
        title: "Finishing & assembly",
        text: "Sanding, painting, vapor smoothing, thread inserts and assembly — your part arrives ready to use.",
      },
    ],
    cta: { label: "Start a custom order", href: "#quote" },
  },

  brands: {
    eyebrow: "For brands",
    title: "Deals that scale with your brand.",
    subtitle:
      "We partner with brands, agencies and retailers to produce merch, packaging, displays and licensed products. White-label manufacturing, bulk pricing and dedicated support — built around your roadmap.",
    benefits: [
      {
        icon: "handshake",
        title: "White-label manufacturing",
        text: "We print it, you brand it. Neutral packaging and drop-shipping direct to your warehouse or customers.",
      },
      {
        icon: "tag",
        title: "Volume & wholesale pricing",
        text: "Tiered pricing that rewards scale. The more you order, the less you pay per unit — predictable margins for you.",
      },
      {
        icon: "shield-check",
        title: "Exclusivity & licensing",
        text: "Exclusive production runs and licensed collaborations, with clear IP terms and NDAs on request.",
      },
      {
        icon: "headset",
        title: "Dedicated account manager",
        text: "A single point of contact who knows your products, your timeline and your quality bar.",
      },
    ],
    steps: [
      { n: "01", title: "Intro call", text: "We learn your brand, volumes and timeline." },
      { n: "02", title: "Sample & quote", text: "We ship samples and lock in pricing." },
      { n: "03", title: "Produce", text: "We manufacture, finish and QC every unit." },
      { n: "04", title: "Deliver", text: "Branded, packed and shipped to spec." },
    ],
    cta: { label: "Become a partner", href: "#quote" },
  },

  capabilities: {
    eyebrow: "Capabilities",
    title: "A studio built for anything you can model.",
    subtitle:
      "Multiple print technologies, dozens of materials and a full post-processing bench under one roof.",
    tech: [
      { name: "FDM / FFF", detail: "Up to 400×400×500 mm · 0.1 mm layers", icon: "layers" },
      { name: "SLA Resin", detail: "High detail · 25 micron XY", icon: "droplet" },
      { name: "Multi-color", detail: "Full-color & dual-extrusion builds", icon: "palette" },
      { name: "Engineering", detail: "Nylon · Carbon fiber · TPU", icon: "cog" },
    ],
    materials: [
      "PLA", "PETG", "ABS", "ASA", "Nylon (PA12)", "Carbon Fiber Nylon",
      "TPU (Flexible)", "Resin (Standard)", "Resin (Tough)", "Resin (Dental)",
      "Wood-fill", "Metal-fill", "PC Blend", "HIPS", "PVA (Support)",
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "From idea in your head to part in your hand.",
    steps: [
      { n: "01", title: "Share your brief", text: "Send a file, sketch or description through the quote form. Tell us quantity, material and deadline." },
      { n: "02", title: "We quote & advise", text: "Within 24h you get a fixed quote plus material and design recommendations from our team." },
      { n: "03", title: "We print & finish", text: "Your part is manufactured, inspected and finished to spec — with photos before it ships." },
      { n: "04", title: "Delivered", text: "Tracked shipping worldwide, or local pickup in Belgium. Reorders are one message away." },
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: "A glimpse of what we make.",
    subtitle:
      "From brand merchandise to engineering prototypes — every project is custom, every part is finished by hand.",
    items: [
      { title: "Branded display units", category: "For brands", image: "/images/gallery-2.png" },
      { title: "Functional prototype", category: "Custom order", image: "/images/gallery-1.png" },
      { title: "Batch production run", category: "Low-batch", image: "/images/gallery-3.png" },
      { title: "Wearable product", category: "Bespoke", image: "/images/gallery-4.png" },
    ],
  },

  faq: [
    {
      q: "What files can I send?",
      a: "STL, OBJ, STEP and 3MF are ideal. If you only have a sketch, photo or physical sample, our designers can model it for you — just describe what you need in the quote form.",
    },
    {
      q: "What's the minimum order?",
      a: "There's no minimum. We happily print a single one-off part, and we also run batches of several hundred units. Pricing per unit drops as quantity rises.",
    },
    {
      q: "How fast can you deliver?",
      a: "Most single-part orders ship within 2–4 business days. Batch and brand orders depend on volume — we'll give you a realistic lead time in your quote.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes. We're based in Belgium and ship worldwide with tracking. Local pickup is also available by appointment.",
    },
    {
      q: "Can you sign an NDA for brand work?",
      a: "Absolutely. We routinely work under NDA for brands and agencies, and can offer exclusive production runs where required.",
    },
    {
      q: "Can you match my brand colors?",
      a: "Yes — we stock a wide filament color range and can source specific Pantone-matched materials for brand and merchandising work.",
    },
  ],

  quote: {
    eyebrow: "Request a quote",
    title: "Tell us what you want to make.",
    subtitle:
      "Share a few details and we'll get back to you within 24 hours with a quote and recommendations. No obligation.",
    projectTypes: [
      "Prototype / R&D",
      "Replacement part",
      "Personalised / bespoke",
      "Low-batch production",
      "Brand / merchandising",
      "Something else",
    ],
  },

  ctaBand: {
    title: "Got an idea that needs printing?",
    subtitle: "Send it over. We'll quote it within 24 hours — no commitment, no jargon.",
    button: { label: "Request a quote", href: "#quote" },
  },
} as const;

export type Brand = typeof brand;
export type Content = typeof content;
