/* =============================================================================
 *  ╔═══════════════════════════════════════════════════════════════════════════╗
 *  ║                    LOBORATORIUM — TRANSLATIONS (i18n)                     ║
 *  ║            All user-facing copy, in every supported language              ║
 *  ╚═══════════════════════════════════════════════════════════════════════════╝
 *
 *  👋  This file holds EVERY word of copy on the site, in every language.
 *  The active language is chosen at runtime (see src/lib/i18n.tsx) and the
 *  whole UI updates instantly — no page reload.
 *
 *  Supported languages: English (en), Dutch (nl), French (fr).
 *  Add a language: add it to `Locale`, `locales`, and provide a `Content`
 *  object below. Done.
 *
 *  NOTE: brand identity (logo, colors, fonts, contact) lives in
 *  src/config/brand.ts and is shared across all languages. Only the copy
 *  is translated here.
 * ========================================================================== */

export type Locale = "en" | "nl" | "fr";

export const locales: Locale[] = ["en", "nl", "fr"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  fr: "Français",
};

export const localeFlags: Record<Locale, string> = {
  en: "EN",
  nl: "NL",
  fr: "FR",
};

/** A title that may have an accent word/phrase rendered in the brand gradient. */
export type Title = { lead?: string; accent?: string; tail?: string };

export type CTA = { label: string; href: string };

export type Content = {
  nav: CTA[];

  hero: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    stats: { value: string; label: string }[];
  };

  marquee: string[];

  shop: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    addToCart: string;
    added: string;
    viewDetails: string;
    from: string;
    outOfStock: string;
    inStock: string;
    categories: Record<string, string>;
    badges: { new: string; popular: string; limited: string };
    specs: { material: string; dimensions: string; layerHeight: string; finishing: string };
    cart: {
      title: string;
      empty: string;
      emptyHint: string;
      browse: string;
      subtotal: string;
      shipping: string;
      shippingNote: string;
      total: string;
      checkout: string;
      remove: string;
      qty: string;
      each: string;
      clear: string;
    };
    checkout: {
      title: string;
      subtitle: string;
      name: string;
      email: string;
      address: string;
      houseNumber: string;
      city: string;
      postalCode: string;
      country: string;
      paymentNote: string;
      placeOrder: string;
      processing: string;
      back: string;
      successTitle: string;
      successMsg: string;
      orderRef: string;
      close: string;
      errRequired: string;
      errEmail: string;
    };
  };

  customOrders: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    items: { icon: string; title: string; text: string }[];
    cta: CTA;
  };

  brands: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    benefits: { icon: string; title: string; text: string }[];
    steps: { n: string; title: string; text: string }[];
    cta: CTA;
    pathLabel: string;
    pathTitle: string;
  };

  capabilities: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    tech: { name: string; detail: string; icon: string }[];
    materialsTitle: string;
    materialsSubtitle: string;
    materials: string[];
  };

  work: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    items: { title: string; category: string; image: string }[];
  };

  process: {
    eyebrow: string;
    title: Title;
    steps: { n: string; title: string; text: string }[];
  };

  quote: {
    eyebrow: string;
    title: Title;
    subtitle: string;
    projectTypes: string[];
    reassurance: { icon: string; title: string; text: string }[];
    form: {
      name: string;
      email: string;
      company: string;
      projectType: string;
      quantity: string;
      budget: string;
      fileUrl: string;
      fileHint: string;
      message: string;
      send: string;
      sending: string;
      agree: string;
      pickOne: string;
    };
    successTitle: string;
    successMsg: string;
    sendAnother: string;
    errName: string;
    errEmail: string;
    errProject: string;
    errMessage: string;
    errFile: string;
  };

  faq: {
    eyebrow: string;
    title: Title;
    items: { q: string; a: string }[];
  };

  ctaBand: {
    title: string;
    subtitle: string;
    button: CTA;
  };

  footer: {
    explore: string;
    services: string;
    contact: string;
    madeToOrder: string;
    rights: string;
    crafted: string;
    revamp: string;
  };

  /* ---- multi-page additions ---- */
  home: {
    featured: {
      eyebrow: string;
      title: Title;
      subtitle: string;
      viewAll: CTA;
    };
    whatWeDo: {
      eyebrow: string;
      title: Title;
      subtitle: string;
      custom: { title: string; text: string; cta: CTA };
      brands: { title: string; text: string; cta: CTA };
    };
    processTeaser: {
      eyebrow: string;
      title: Title;
      subtitle: string;
      cta: CTA;
    };
  };

  about: {
    eyebrow: string;
    title: Title;
    intro: string;
    story: string[];
    values: { icon: string; title: string; text: string }[];
    cta: CTA;
  };

  pageMeta: {
    home: string;
    shop: string;
    product: string;
    customOrders: string;
    brands: string;
    capabilities: string;
    work: string;
    process: string;
    faq: string;
    quote: string;
    about: string;
  };

  common: {
    home: string;
    backToHome: string;
    viewAll: string;
    exploreShop: string;
    notFoundTitle: string;
    notFoundText: string;
  };
};

/* ===========================================================================
 *  ENGLISH
 * ========================================================================= */
const en: Content = {
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Custom Orders", href: "/custom-orders" },
    { label: "For Brands", href: "/brands" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],

  hero: {
    eyebrow: "Custom 3D printing · Made in Belgium",
    title: { lead: "We turn ideas into", accent: "tangible things." },
    subtitle:
      "Loboratorium is a custom 3D printing studio for makers, brands and businesses. From a one-off prototype to a branded production run — we print it, finish it, and ship it.",
    primaryCta: { label: "Request a custom quote", href: "/quote" },
    secondaryCta: { label: "Partner with us", href: "/brands" },
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

  shop: {
    eyebrow: "Shop",
    title: { lead: "Ready-made pieces,", accent: "ready to ship." },
    subtitle:
      "Browse our catalogue of ready-to-ship 3D printed products. Add to cart, check out, and we'll print and dispatch within days. Looking for something custom? Scroll on.",
    addToCart: "Add to cart",
    added: "Added",
    viewDetails: "View details",
    from: "From",
    outOfStock: "Out of stock",
    inStock: "In stock",
    categories: {
      all: "All",
      decor: "Decor",
      plants: "Plants",
      kitchen: "Kitchen",
      storage: "Storage",
      games: "Games",
      keychains: "Keychains",
    },
    badges: { new: "New", popular: "Popular", limited: "Limited" },
    specs: {
      material: "Material",
      dimensions: "Dimensions",
      layerHeight: "Layer height",
      finishing: "Finishing",
    },
    cart: {
      title: "Your cart",
      empty: "Your cart is empty",
      emptyHint: "Add a few pieces from the shop to get started.",
      browse: "Browse the shop",
      subtotal: "Subtotal",
      shipping: "Shipping",
      shippingNote: "Calculated at checkout · free over €150",
      total: "Total",
      checkout: "Checkout",
      remove: "Remove",
      qty: "Qty",
      each: "each",
      clear: "Clear cart",
    },
    checkout: {
      title: "Checkout",
      subtitle: "Almost there — just your shipping details.",
      name: "Full name",
      email: "Email",
      address: "Address",
      houseNumber: "No.",
      city: "City",
      postalCode: "Postal code",
      country: "Country",
      paymentNote:
        "You will be redirected to Mollie to pay securely. Your order is confirmed when payment succeeds.",
      placeOrder: "Place order",
      processing: "Placing order…",
      back: "Back to cart",
      successTitle: "Order placed!",
      successMsg:
        "Thanks for your order. We've received it and will email you a confirmation shortly.",
      orderRef: "Your order reference",
      close: "Close",
      errRequired: "This field is required",
      errEmail: "Please enter a valid email",
    },
  },

  customOrders: {
    eyebrow: "Custom orders",
    title: { lead: "Bring us your wildest", accent: "part." },
    subtitle:
      "Send a sketch, a CAD file, or just an idea. We handle design for additive manufacturing, material selection, printing and post-processing — so you get a part that actually works.",
    items: [
      { icon: "boxes", title: "Prototypes & R&D", text: "Iterate fast with functional prototypes that look and feel like the real thing. Perfect for product development and investor demos." },
      { icon: "wrench", title: "Replacement & spare parts", text: "Hard-to-find or discontinued parts recreated from samples or drawings, printed in durable engineering materials." },
      { icon: "gift", title: "Personalised & bespoke", text: "Custom gifts, signage, displays and one-off pieces tailored exactly to your specifications and brand." },
      { icon: "factory", title: "Low-batch production", text: "Skip the mould. Produce 10–500 units of a part economically, with consistent quality and repeatable results." },
      { icon: "pen-tool", title: "Design for print", text: "No CAD? No problem. Our designers optimise or model your part from scratch for clean, reliable prints." },
      { icon: "sparkles", title: "Finishing & assembly", text: "Sanding, painting, vapor smoothing, thread inserts and assembly — your part arrives ready to use." },
    ],
    cta: { label: "Start a custom order", href: "/quote" },
  },

  brands: {
    eyebrow: "For brands",
    title: { lead: "Deals that", accent: "scale", tail: "with your brand." },
    subtitle:
      "We partner with brands, agencies and retailers to produce merch, packaging, displays and licensed products. White-label manufacturing, bulk pricing and dedicated support — built around your roadmap.",
    benefits: [
      { icon: "handshake", title: "White-label manufacturing", text: "We print it, you brand it. Neutral packaging and drop-shipping direct to your warehouse or customers." },
      { icon: "tag", title: "Volume & wholesale pricing", text: "Tiered pricing that rewards scale. The more you order, the less you pay per unit — predictable margins for you." },
      { icon: "shield-check", title: "Exclusivity & licensing", text: "Exclusive production runs and licensed collaborations, with clear IP terms and NDAs on request." },
      { icon: "headset", title: "Dedicated account manager", text: "A single point of contact who knows your products, your timeline and your quality bar." },
    ],
    steps: [
      { n: "01", title: "Intro call", text: "We learn your brand, volumes and timeline." },
      { n: "02", title: "Sample & quote", text: "We ship samples and lock in pricing." },
      { n: "03", title: "Produce", text: "We manufacture, finish and QC every unit." },
      { n: "04", title: "Deliver", text: "Branded, packed and shipped to spec." },
    ],
    cta: { label: "Become a partner", href: "/quote" },
    pathLabel: "Partnership path",
    pathTitle: "From intro to delivery",
  },

  capabilities: {
    eyebrow: "Capabilities",
    title: { lead: "A studio built for", accent: "anything you can model." },
    subtitle:
      "Multiple print technologies, dozens of materials and a full post-processing bench under one roof.",
    tech: [
      { name: "FDM / FFF", detail: "Up to 400×400×500 mm · 0.1 mm layers", icon: "layers" },
      { name: "SLA Resin", detail: "High detail · 25 micron XY", icon: "droplet" },
      { name: "Multi-color", detail: "Full-color & dual-extrusion builds", icon: "palette" },
      { name: "Engineering", detail: "Nylon · Carbon fiber · TPU", icon: "cog" },
    ],
    materialsTitle: "Materials we print",
    materialsSubtitle:
      "40+ filaments & resins in stock — can't find yours? We'll source it.",
    materials: [
      "PLA", "PETG", "ABS", "ASA", "Nylon (PA12)", "Carbon Fiber Nylon",
      "TPU (Flexible)", "Resin (Standard)", "Resin (Tough)", "Resin (Dental)",
      "Wood-fill", "Metal-fill", "PC Blend", "HIPS", "PVA (Support)",
    ],
  },

  work: {
    eyebrow: "Selected work",
    title: { lead: "A glimpse of", accent: "what we make." },
    subtitle:
      "From brand merchandise to engineering prototypes — every project is custom, every part is finished by hand.",
    items: [
      { title: "Branded display units", category: "For brands", image: "/images/gallery-2.png" },
      { title: "Functional prototype", category: "Custom order", image: "/images/gallery-1.png" },
      { title: "Batch production run", category: "Low-batch", image: "/images/gallery-3.png" },
      { title: "Wearable product", category: "Bespoke", image: "/images/gallery-4.png" },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: { lead: "From idea in your head to", accent: "part in your hand." },
    steps: [
      { n: "01", title: "Share your brief", text: "Send a file, sketch or description through the quote form. Tell us quantity, material and deadline." },
      { n: "02", title: "We quote & advise", text: "Within 24h you get a fixed quote plus material and design recommendations from our team." },
      { n: "03", title: "We print & finish", text: "Your part is manufactured, inspected and finished to spec — with photos before it ships." },
      { n: "04", title: "Delivered", text: "Tracked shipping worldwide, or local pickup in Belgium. Reorders are one message away." },
    ],
  },

  quote: {
    eyebrow: "Request a quote",
    title: { lead: "Tell us what you want to", accent: "make." },
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
    reassurance: [
      { icon: "clock", title: "24h response", text: "We reply to every request within one business day." },
      { icon: "shield-check", title: "No obligation", text: "Quotes are free. NDA available on request." },
      { icon: "mail", title: "Human support", text: "Talk to the people who actually print your part." },
    ],
    form: {
      name: "Your name",
      email: "Email",
      company: "Company / brand",
      projectType: "Project type",
      quantity: "Quantity",
      budget: "Budget (optional)",
      fileUrl: "Link to file (optional)",
      fileHint: "STL, OBJ, STEP — or a Drive / WeTransfer link",
      message: "Describe your project",
      send: "Send request",
      sending: "Sending…",
      agree: "By sending, you agree we may contact you about your request.",
      pickOne: "Pick one…",
    },
    successTitle: "Request received!",
    successMsg:
      "Thanks for reaching out. Our team will review your brief and reply within 24 hours with a quote and next steps.",
    sendAnother: "Send another request",
    errName: "Please enter your name",
    errEmail: "Please enter a valid email",
    errProject: "Please pick a project type",
    errMessage: "Tell us a bit more about your project",
    errFile: "Please paste a valid URL (https://…)",
  },

  faq: {
    eyebrow: "FAQ",
    title: { lead: "Questions,", accent: "answered." },
    items: [
      { q: "What files can I send?", a: "STL, OBJ, STEP and 3MF are ideal. If you only have a sketch, photo or physical sample, our designers can model it for you — just describe what you need in the quote form." },
      { q: "What's the minimum order?", a: "There's no minimum. We happily print a single one-off part, and we also run batches of several hundred units. Pricing per unit drops as quantity rises." },
      { q: "How fast can you deliver?", a: "Most single-part orders ship within 2–4 business days. Batch and brand orders depend on volume — we'll give you a realistic lead time in your quote." },
      { q: "Do you ship internationally?", a: "Yes. We're based in Belgium and ship worldwide with tracking. Local pickup is also available by appointment." },
      { q: "Can you sign an NDA for brand work?", a: "Absolutely. We routinely work under NDA for brands and agencies, and can offer exclusive production runs where required." },
      { q: "Can you match my brand colors?", a: "Yes — we stock a wide filament color range and can source specific Pantone-matched materials for brand and merchandising work." },
    ],
  },

  ctaBand: {
    title: "Got an idea that needs printing?",
    subtitle:
      "Send it over. We'll quote it within 24 hours — no commitment, no jargon.",
    button: { label: "Request a quote", href: "/quote" },
  },

  footer: {
    explore: "Explore",
    services: "Services",
    contact: "Contact",
    madeToOrder: "Made to order",
    rights: "All rights reserved.",
    crafted: "Crafted with precision in Belgium",
    revamp: "Edit your brand in",
  },

  home: {
    featured: {
      eyebrow: "From the shop",
      title: { lead: "Featured pieces,", accent: "ready to ship." },
      subtitle:
        "A taste of what we make. Browse the full catalogue for more, or commission something entirely your own.",
      viewAll: { label: "View all products", href: "/shop" },
    },
    whatWeDo: {
      eyebrow: "What we do",
      title: { lead: "Two ways to", accent: "work with us." },
      subtitle:
        "Whether you need a single bespoke part or a branded production run, we've got a path for you.",
      custom: {
        title: "Custom orders",
        text: "One-off prototypes, replacement parts, personalised gifts and low-batch runs — designed, printed and finished to your spec.",
        cta: { label: "Explore custom orders", href: "/custom-orders" },
      },
      brands: {
        title: "For brands",
        text: "White-label manufacturing, wholesale pricing and licensed collaborations — built around your brand's roadmap.",
        cta: { label: "Partner with us", href: "/brands" },
      },
    },
    processTeaser: {
      eyebrow: "How it works",
      title: { lead: "From idea to part in", accent: "four steps." },
      subtitle:
        "A simple, transparent process — share your brief, get a quote in 24h, we print and finish, then ship worldwide.",
      cta: { label: "See the full process", href: "/process" },
    },
  },

  about: {
    eyebrow: "About us",
    title: { lead: "A Belgian studio obsessed with", accent: "making things real." },
    intro:
      "Loboratorium is a custom 3D printing studio based in Belgium. We help makers, brands and businesses turn ideas into physical objects — from a single prototype to a production run.",
    story: [
      "What started as a garage project quickly grew into a full studio. We invested in multiple print technologies, a wall of materials, and a post-processing bench — because a great print isn't finished when the printer stops.",
      "Today we work with everyone from hobbyists with a sketch to international brands needing thousands of units. The common thread: we treat every part as if we were going to use it ourselves.",
      "We believe additive manufacturing should be accessible, fast and genuinely useful. No jargon, no inflated quotes — just well-made parts, delivered on time.",
    ],
    values: [
      { icon: "sparkles", title: "Quality first", text: "Every part is inspected and finished by hand before it leaves the studio." },
      { icon: "clock", title: "Fast turnaround", text: "Most orders ship in days, not weeks. We quote within 24 hours." },
      { icon: "shield-check", title: "Honest & confidential", text: "Transparent pricing and NDAs for brand work. Your IP stays yours." },
      { icon: "boxes", title: "Materials for every job", text: "40+ filaments and resins in stock — and we'll source anything else." },
    ],
    cta: { label: "Start a project", href: "/quote" },
  },

  pageMeta: {
    home: "Home",
    shop: "Shop",
    product: "Product",
    customOrders: "Custom Orders",
    brands: "For Brands",
    capabilities: "Capabilities",
    work: "Work",
    process: "Process",
    faq: "FAQ",
    quote: "Request a Quote",
    about: "About",
  },

  common: {
    home: "Home",
    backToHome: "Back to home",
    viewAll: "View all",
    exploreShop: "Explore the shop",
    notFoundTitle: "Page not found",
    notFoundText: "The page you're looking for doesn't exist or has moved.",
  },
};

/* ===========================================================================
 *  DUTCH (Nederlands)  — placeholder EN copy; replaced by translator.
 * ========================================================================= */
const nl: Content = {
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Op maat", href: "/custom-orders" },
    { label: "Voor merken", href: "/brands" },
    { label: "Mogelijkheden", href: "/capabilities" },
    { label: "Werk", href: "/work" },
    { label: "Proces", href: "/process" },
    { label: "Over ons", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
  hero: {
    eyebrow: "3D-printen op maat · Gemaakt in België",
    title: { lead: "Wij maken van ideeën", accent: "tastbare dingen." },
    subtitle:
      "Loboratorium is een 3D-printstudio op maat voor makers, merken en bedrijven. Van een uniek prototype tot een merkgebonden productielijn — wij printen, afwerken en verzenden het.",
    primaryCta: { label: "Vraag een offerte op maat", href: "/quote" },
    secondaryCta: { label: "Word onze partner", href: "/brands" },
    stats: [
      { value: "12k+", label: "Onderdelen geprint" },
      { value: "40+", label: "Materialen" },
      { value: "96u", label: "Gem. levertijd" },
      { value: "30+", label: "Merkpartners" },
    ],
  },
  marquee: [
    "FDM", "SLA", "Hars", "PETG", "ABS", "Nylon", "TPU", "Koolstofvezel",
    "PLA", "Harsgieten", "Meerkleurig", "Prototyping", "Kleine series", "Afwerking",
  ],
  shop: {
    eyebrow: "Shop",
    title: { lead: "Klare stukken,", accent: "klaar om te verzenden." },
    subtitle:
      "Blader door onze catalogus van kant-en-klare 3D-geprinte producten. Voeg toe aan je winkelmandje, check uit en wij printen en verzenden binnen enkele dagen. Op zoek naar iets op maat? Scroll verder.",
    addToCart: "In winkelmandje",
    added: "Toegevoegd",
    viewDetails: "Bekijk details",
    from: "Vanaf",
    outOfStock: "Uitverkocht",
    inStock: "Op voorraad",
    categories: { all: "Alles", decor: "Decoratie", plants: "Planten", kitchen: "Keuken", storage: "Opbergen", games: "Spellen", keychains: "Sleutelhangers" },
    badges: { new: "Nieuw", popular: "Populair", limited: "Beperkt" },
    specs: { material: "Materiaal", dimensions: "Afmetingen", layerHeight: "Laaghoogte", finishing: "Afwerking" },
    cart: {
      title: "Je winkelmandje",
      empty: "Je winkelmandje is leeg",
      emptyHint: "Voeg een paar stukken uit de shop toe om te beginnen.",
      browse: "Bekijk de shop",
      subtotal: "Subtotaal",
      shipping: "Verzending",
      shippingNote: "Berekend bij checkout · gratis vanaf €150",
      total: "Totaal",
      checkout: "Afrekenen",
      remove: "Verwijderen",
      qty: "Aantal",
      each: "per stuk",
      clear: "Winkelmandje legen",
    },
    checkout: {
      title: "Afrekenen",
      subtitle: "Bijna klaar — alleen nog je bezorggegevens.",
      name: "Volledige naam",
      email: "E-mailadres",
      address: "Adres",
      houseNumber: "Nr.",
      city: "Stad",
      postalCode: "Postcode",
      country: "Land",
      paymentNote:
        "Je wordt doorgestuurd naar Mollie om veilig te betalen. Je bestelling is bevestigd zodra de betaling lukt.",
      placeOrder: "Bestelling plaatsen",
      processing: "Bestelling plaatsen…",
      back: "Terug naar winkelmandje",
      successTitle: "Bestelling geplaatst!",
      successMsg:
        "Bedankt voor je bestelling. We hebben ze ontvangen en sturen je binnenkort een bevestiging via e-mail.",
      orderRef: "Je referentienummer",
      close: "Sluiten",
      errRequired: "Dit veld is verplicht",
      errEmail: "Vul een geldig e-mailadres in",
    },
  },
  customOrders: {
    eyebrow: "Op maat",
    title: { lead: "Kom maar met je", accent: "gekste idee." },
    subtitle:
      "Stuur een schets, een CAD-bestand of gewoon een idee. Wij nemen het ontwerp, de materiaalkeuze, het printen en de afwerking op ons — zodat je een stuk krijgt dat écht werkt.",
    items: [
      { icon: "boxes", title: "Prototypes & R&D", text: "Itereer snel met functionele prototypes die eruitzien en aanvoelen als het echte werk. Perfect voor productontwikkeling en investeerdersdemo's." },
      { icon: "wrench", title: "Vervang- & reserveonderdelen", text: "Moeilijk vindbare of uit productie genomen onderdelen, gereconstrueerd op basis van monsters of tekeningen, geprint in duurzame technische materialen." },
      { icon: "gift", title: "Gepersonaliseerd & uniek", text: "Op maat gemaakte geschenken, signalisatie, displays en unieke stukken, exact afgestemd op jouw wensen en merk." },
      { icon: "factory", title: "Kleine series", text: "Sla de mal over. Produceer 10–500 stuks economisch, met consistente kwaliteit en herhaalbare resultaten." },
      { icon: "pen-tool", title: "Ontwerp voor print", text: "Geen CAD? Geen probleem. Onze ontwerpers optimaliseren je model of tekenen het van nul, voor propere en betrouwbare prints." },
      { icon: "sparkles", title: "Afwerking & assemblage", text: "Schuren, schilderen, vapor smoothing, draadinserts en assemblage — jouw stuk komt gebruiksklaar aan." },
    ],
    cta: { label: "Start een op-maat-bestelling", href: "/quote" },
  },
  brands: {
    eyebrow: "Voor merken",
    title: { lead: "Deals die", accent: "meeschalen", tail: "met jouw merk." },
    subtitle:
      "Wij werken samen met merken, bureaus en retailers voor merchandise, verpakkingen, displays en producten onder licentie. White-label productie, volumekortingen en persoonlijke begeleiding — afgestemd op jouw planning.",
    benefits: [
      { icon: "handshake", title: "White-label productie", text: "Wij printen het, jij brengt het onder je merk. Neutrale verpakking en drop-shipping direct naar jouw magazijn of klanten." },
      { icon: "tag", title: "Volume- & groothandelprijzen", text: "Gelaagde prijzen die schalen belonen. Hoe meer je bestelt, hoe minder je per stuk betaalt — voorspelbare marges voor jou." },
      { icon: "shield-check", title: "Exclusiviteit & licenties", text: "Exclusieve productieruns en samenwerkingen onder licentie, met duidelijke IP-afspraken en NDA's op verzoek." },
      { icon: "headset", title: "Eigen accountmanager", text: "Eén vast aanspreekpunt dat jouw producten, timing en kwaliteitseisen kent." },
    ],
    steps: [
      { n: "01", title: "Kennismaking", text: "We leren jouw merk, volumes en timing kennen." },
      { n: "02", title: "Sample & offerte", text: "We sturen samples en fixeren de prijzen." },
      { n: "03", title: "Productie", text: "We produceren, werken af en controleren elk stuk op kwaliteit." },
      { n: "04", title: "Levering", text: "Gemerkt, verpakt en verzonden volgens afspraak." },
    ],
    cta: { label: "Word partner", href: "/quote" },
    pathLabel: "Partnerschap-traject",
    pathTitle: "Van kennismaking tot levering",
  },
  capabilities: {
    eyebrow: "Mogelijkheden",
    title: { lead: "Een studio gebouwd voor", accent: "alles wat je kan modelleren." },
    subtitle:
      "Meerdere printtechnologieën, tientallen materialen en een volledige nabewerkingsbank onder één dak.",
    tech: [
      { name: "FDM / FFF", detail: "Tot 400×400×500 mm · 0,1 mm lagen", icon: "layers" },
      { name: "SLA Hars", detail: "Hoog detail · 25 micron XY", icon: "droplet" },
      { name: "Meerkleurig", detail: "Full-color & dual-extrusion builds", icon: "palette" },
      { name: "Technisch", detail: "Nylon · Koolstofvezel · TPU", icon: "cog" },
    ],
    materialsTitle: "Materialen die wij printen",
    materialsSubtitle:
      "40+ filaments & harsen op voorraad — vind je het niet? Wij zoeken het voor je.",
    materials: [
      "PLA", "PETG", "ABS", "ASA", "Nylon (PA12)", "Koolstofvezel Nylon",
      "TPU (Flexibel)", "Hars (Standaard)", "Hars (Tough)", "Hars (Dentaal)",
      "Hout-vul", "Metaal-vul", "PC Blend", "HIPS", "PVA (Support)",
    ],
  },
  work: {
    eyebrow: "Geselecteerd werk",
    title: { lead: "Een blik op", accent: "wat wij maken." },
    subtitle:
      "Van merk-merchandise tot technische prototypes — elk project is op maat, elk stuk is met de hand afgewerkt.",
    items: [
      { title: "Merkgebonden displays", category: "Voor merken", image: "/images/gallery-2.png" },
      { title: "Functioneel prototype", category: "Op maat", image: "/images/gallery-1.png" },
      { title: "Productieserie", category: "Kleine serie", image: "/images/gallery-3.png" },
      { title: "Draagbaar product", category: "Uniek", image: "/images/gallery-4.png" },
    ],
  },
  process: {
    eyebrow: "Hoe het werkt",
    title: { lead: "Van idee in je hoofd tot", accent: "stuk in je hand." },
    steps: [
      { n: "01", title: "Deel je brief", text: "Stuur een bestand, schets of beschrijving via het offerteformulier. Geef aantal, materiaal en deadline door." },
      { n: "02", title: "Wij bieden & adviseren", text: "Binnen 24u krijg je een vaste offerte plus materiaal- en ontwerpadvies van ons team." },
      { n: "03", title: "Wij printen & afwerken", text: "Jouw stuk wordt geproduceerd, geïnspecteerd en afgewerkt — met foto's voor verzending." },
      { n: "04", title: "Geleverd", text: "Tracking wereldwijd, of afhalen in België. Nabestellingen zijn één bericht verwijderd." },
    ],
  },
  quote: {
    eyebrow: "Offerte aanvragen",
    title: { lead: "Vertel ons wat je wil", accent: "maken." },
    subtitle:
      "Deel een paar details en we komen binnen 24 uur bij je terug met een offerte en advies. Zonder verplichting.",
    projectTypes: [
      "Prototype / R&D",
      "Vervangend onderdeel",
      "Gepersonaliseerd / uniek",
      "Kleine serie",
      "Merk / merchandising",
      "Iets anders",
    ],
    reassurance: [
      { icon: "clock", title: "24u reactie", text: "We reageren op elke aanvraag binnen één werkdag." },
      { icon: "shield-check", title: "Zonder verplichting", text: "Offertes zijn gratis. NDA op verzoek." },
      { icon: "mail", title: "Persoonlijke support", text: "Praat met de mensen die jouw stuk écht printen." },
    ],
    form: {
      name: "Je naam",
      email: "E-mailadres",
      company: "Bedrijf / merk",
      projectType: "Projecttype",
      quantity: "Aantal",
      budget: "Budget (optioneel)",
      fileUrl: "Link naar bestand (optioneel)",
      fileHint: "STL, OBJ, STEP — of een Drive / WeTransfer-link",
      message: "Beschrijf je project",
      send: "Aanvraag versturen",
      sending: "Versturen…",
      agree: "Door te versturen ga je akkoord dat we contact opnemen over je aanvraag.",
      pickOne: "Kies er één…",
    },
    successTitle: "Aanvraag ontvangen!",
    successMsg:
      "Bedankt voor je bericht. Ons team bekijkt je brief en antwoordt binnen 24 uur met een offerte en de volgende stappen.",
    sendAnother: "Nog een aanvraag versturen",
    errName: "Vul je naam in",
    errEmail: "Vul een geldig e-mailadres in",
    errProject: "Kies een projecttype",
    errMessage: "Vertel ons wat meer over je project",
    errFile: "Plak een geldige URL (https://…)",
  },
  faq: {
    eyebrow: "FAQ",
    title: { lead: "Vragen,", accent: "beantwoord." },
    items: [
      { q: "Welke bestanden kan ik sturen?", a: "STL, OBJ, STEP en 3MF zijn ideaal. Als je alleen een schets, foto of fysiek monster hebt, kunnen onze ontwerpers het voor je modelleren — beschrijf gewoon wat je nodig hebt in het formulier." },
      { q: "Wat is de minimumbestelling?", a: "Er is geen minimum. We printen graag een enkel uniek stuk, maar draaien ook series van enkele honderden stuks. De prijs per stuk daalt naarmate het aantal stijgt." },
      { q: "Hoe snel kunnen jullie leveren?", a: "De meeste losse bestellingen worden binnen 2–4 werkdagen verzonden. Series en merkorders hangen af van het volume — je krijgt een realistische levertijd in je offerte." },
      { q: "Leveren jullie internationaal?", a: "Ja. We zitten in België en verzenden wereldwijd met tracking. Afhalen is ook mogelijk op afspraak." },
      { q: "Kunnen jullie een NDA tekenen voor merkwerk?", a: "Zeker. We werken routinematig onder NDA voor merken en agentschappen, en kunnen exclusieve productielijnen aanbieden waar gewenst." },
      { q: "Kunnen jullie mijn merkkleuren matchen?", a: "Ja — we hebben een breed gamma filamentkleuren op voorraad en kunnen specifieke Pantone-kleuren voor je bestellen voor merk- en merchandisingwerk." },
    ],
  },
  ctaBand: {
    title: "Heb je een idee dat geprint moet worden?",
    subtitle:
      "Stuur het door. We bieden binnen 24 uur — zonder verplichting, zonder jargon.",
    button: { label: "Vraag een offerte", href: "/quote" },
  },
  footer: {
    explore: "Ontdek",
    services: "Diensten",
    contact: "Contact",
    madeToOrder: "Op maat gemaakt",
    rights: "Alle rechten voorbehouden.",
    crafted: "Met precisie gemaakt in België",
    revamp: "Pas je merk aan in",
  },

  home: {
    featured: {
      eyebrow: "Uit de shop",
      title: { lead: "Uitgelichte stukken,", accent: "klaar om te verzenden." },
      subtitle:
        "Een voorproefje van wat wij maken. Blader door de volledige catalogus voor meer, of laat iets helemaal op maat maken.",
      viewAll: { label: "Bekijk alle producten", href: "/shop" },
    },
    whatWeDo: {
      eyebrow: "Wat we doen",
      title: { lead: "Twee manieren om", accent: "samen te werken." },
      subtitle:
        "Of je nu één uniek stuk nodig hebt of een merkgebonden productielijn, we hebben een traject voor je.",
      custom: {
        title: "Op maat",
        text: "Unieke prototypes, vervangonderdelen, gepersonaliseerde geschenken en kleine series — ontworpen, geprint en afgewerkt volgens jouw wensen.",
        cta: { label: "Ontdek op-maat-bestellingen", href: "/custom-orders" },
      },
      brands: {
        title: "Voor merken",
        text: "White-label productie, groothandelprijzen en samenwerkingen onder licentie — afgestemd op de planning van jouw merk.",
        cta: { label: "Word onze partner", href: "/brands" },
      },
    },
    processTeaser: {
      eyebrow: "Hoe het werkt",
      title: { lead: "Van idee naar stuk in", accent: "vier stappen." },
      subtitle:
        "Een eenvoudig, transparant proces — deel je brief, krijg binnen 24u een offerte, wij printen en werken af, dan wereldwijd verzenden.",
      cta: { label: "Bekijk het volledige proces", href: "/process" },
    },
  },

  about: {
    eyebrow: "Over ons",
    title: { lead: "Een Belgische studio met een obsessie voor", accent: "dingen écht maken." },
    intro:
      "Loboratorium is een 3D-printstudio op maat, gevestigd in België. We helpen makers, merken en bedrijven om ideeën om te zetten in tastbare objecten — van één prototype tot een volledige productielijn.",
    story: [
      "Wat begon als een garageproject groeide snel uit tot een volledige studio. We investeerden in meerdere printtechnologieën, een muur vol materialen en een nabewerkingsbank — want een goede print is niet af als de printer stopt.",
      "Vandaag werken we met iedereen, van hobbyisten met een schets tot internationale merken die duizenden stuks nodig hebben. De rode draad: we behandelen elk stuk alsof we het zelf zouden gebruiken.",
      "We geloven dat additieve productie toegankelijk, snel en écht nuttig hoort te zijn. Geen jargon, geen opgeblazen offertes — gewoon goed gemaakte stukken, op tijd geleverd.",
    ],
    values: [
      { icon: "sparkles", title: "Kwaliteit voorop", text: "Elk stuk wordt geïnspecteerd en met de hand afgewerkt voordat het de studio verlaat." },
      { icon: "clock", title: "Snelle levering", text: "De meeste bestellingen worden in dagen geleverd, niet weken. We bieden binnen 24u." },
      { icon: "shield-check", title: "Eerlijk & vertrouwelijk", text: "Transparante prijzen en NDA's voor merkwerk. Jouw IP blijft van jou." },
      { icon: "boxes", title: "Materialen voor elke job", text: "40+ filaments en harsen op voorraad — en we sourcen alles wat ontbreekt." },
    ],
    cta: { label: "Start een project", href: "/quote" },
  },

  pageMeta: {
    home: "Home",
    shop: "Shop",
    product: "Product",
    customOrders: "Op maat",
    brands: "Voor merken",
    capabilities: "Mogelijkheden",
    work: "Werk",
    process: "Proces",
    faq: "FAQ",
    quote: "Offerte aanvragen",
    about: "Over ons",
  },

  common: {
    home: "Home",
    backToHome: "Terug naar home",
    viewAll: "Bekijk alles",
    exploreShop: "Bekijk de shop",
    notFoundTitle: "Pagina niet gevonden",
    notFoundText: "De pagina die je zoekt bestaat niet of is verplaatst.",
  },
};

/* ===========================================================================
 *  FRENCH (Français)  — placeholder EN copy; replaced by translator.
 * ========================================================================= */
const fr: Content = {
  nav: [
    { label: "Boutique", href: "/shop" },
    { label: "Sur mesure", href: "/custom-orders" },
    { label: "Pour marques", href: "/brands" },
    { label: "Savoir-faire", href: "/capabilities" },
    { label: "Réalisations", href: "/work" },
    { label: "Processus", href: "/process" },
    { label: "À propos", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
  hero: {
    eyebrow: "Impression 3D sur mesure · Fabriqué en Belgique",
    title: { lead: "Nous transformons vos idées en", accent: "objets réels." },
    subtitle:
      "Loboratorium est un studio d'impression 3D sur mesure pour les créateurs, marques et entreprises. Du prototype unique à la production de marque — nous imprimons, finissons et expédions.",
    primaryCta: { label: "Demander un devis sur mesure", href: "/quote" },
    secondaryCta: { label: "Devenir partenaire", href: "/brands" },
    stats: [
      { value: "12k+", label: "Pièces imprimées" },
      { value: "40+", label: "Matériaux" },
      { value: "96h", label: "Délai moyen" },
      { value: "30+", label: "Marques partenaires" },
    ],
  },
  marquee: [
    "FDM", "SLA", "Résine", "PETG", "ABS", "Nylon", "TPU", "Fibre de carbone",
    "PLA", "Moulage résine", "Multicolore", "Prototypage", "Petite série", "Finition",
  ],
  shop: {
    eyebrow: "Boutique",
    title: { lead: "Des pièces toutes faites,", accent: "prêtes à expédier." },
    subtitle:
      "Parcourez notre catalogue de produits imprimés en 3D prêts à l'emploi. Ajoutez au panier, commandez, et nous imprimons et expédions sous quelques jours. Envie de sur-mesure ? Continuez plus bas.",
    addToCart: "Ajouter au panier",
    added: "Ajouté",
    viewDetails: "Voir les détails",
    from: "À partir de",
    outOfStock: "Épuisé",
    inStock: "En stock",
    categories: { all: "Tout", decor: "Déco", plants: "Plantes", kitchen: "Cuisine", storage: "Rangement", games: "Jeux", keychains: "Porte-clés" },
    badges: { new: "Nouveau", popular: "Populaire", limited: "Édition limitée" },
    specs: { material: "Matériau", dimensions: "Dimensions", layerHeight: "Hauteur de couche", finishing: "Finition" },
    cart: {
      title: "Votre panier",
      empty: "Votre panier est vide",
      emptyHint: "Ajoutez quelques pièces de la boutique pour commencer.",
      browse: "Parcourir la boutique",
      subtotal: "Sous-total",
      shipping: "Livraison",
      shippingNote: "Calculée au paiement · offerte dès 150 €",
      total: "Total",
      checkout: "Commander",
      remove: "Retirer",
      qty: "Qté",
      each: "pièce",
      clear: "Vider le panier",
    },
    checkout: {
      title: "Paiement",
      subtitle: "Presque fini — juste vos coordonnées de livraison.",
      name: "Nom complet",
      email: "E-mail",
      address: "Adresse",
      houseNumber: "No.",
      city: "Ville",
      postalCode: "Code postal",
      country: "Pays",
      paymentNote:
        "Vous serez redirige vers Mollie pour payer en securite. Votre commande est confirmee lorsque le paiement reussit.",
      placeOrder: "Valider la commande",
      processing: "Validation en cours…",
      back: "Retour au panier",
      successTitle: "Commande validée !",
      successMsg:
        "Merci pour votre commande. Nous l'avons bien recue et vous enverrons sous peu une confirmation par e-mail.",
      orderRef: "Votre référence de commande",
      close: "Fermer",
      errRequired: "Ce champ est requis",
      errEmail: "Veuillez saisir un e-mail valide",
    },
  },
  customOrders: {
    eyebrow: "Sur mesure",
    title: { lead: "Lancez-nous votre", accent: "défi le plus fou." },
    subtitle:
      "Envoyez un croquis, un fichier CAO ou juste une idée. Nous gérons la conception pour fabrication additive, le choix des matériaux, l'impression et la post-finition — pour une pièce qui fonctionne vraiment.",
    items: [
      { icon: "boxes", title: "Prototypes & R&D", text: "Itérez rapidement avec des prototypes fonctionnels qui ressemblent au produit final. Parfait pour le développement produit et les démos investisseurs." },
      { icon: "wrench", title: "Pièces de remplacement", text: "Pièces introuvables ou abandonnées, recréées à partir d'échantillons ou de plans, imprimées dans des matériaux techniques durables." },
      { icon: "gift", title: "Personnalisé & sur mesure", text: "Cadeaux, signalétique, présentoirs et pièces uniques adaptés exactement à vos besoins et à votre marque." },
      { icon: "factory", title: "Petite série", text: "Passez le moule. Produisez 10–500 unités économiquement, avec une qualité constante et des résultats reproductibles." },
      { icon: "pen-tool", title: "Conception pour impression", text: "Pas de CAO ? Aucun souci. Nos designers optimisent votre modèle ou le créent de zéro, pour des impressions nettes et fiables." },
      { icon: "sparkles", title: "Finition & assemblage", text: "Ponçage, peinture, lissage vapeur, inserts filetés et assemblage — votre pièce arrive prête à l'emploi." },
    ],
    cta: { label: "Démarrer une commande sur mesure", href: "/quote" },
  },
  brands: {
    eyebrow: "Pour marques",
    title: { lead: "Des accords qui", accent: "passent à l'échelle", tail: "avec votre marque." },
    subtitle:
      "Nous nous associons à des marques, agences et détaillants pour produire produits dérivés, emballages, présentoirs et articles sous licence. Fabrication en marque blanche, tarifs dégressifs et accompagnement dédié — calés sur votre feuille de route.",
    benefits: [
      { icon: "handshake", title: "Fabrication en marque blanche", text: "Nous imprimons, vous apposez votre marque. Emballage neutre et expédition directe vers votre entrepôt ou vos clients." },
      { icon: "tag", title: "Tarifs volume & gros", text: "Tarification dégressive qui récompense l'échelle. Plus vous commandez, moins vous payez par unité — des marges prévisibles." },
      { icon: "shield-check", title: "Exclusivité & licences", text: "Production exclusive et collaborations sous licence, avec des termes IP clairs et NDA sur demande." },
      { icon: "headset", title: "Gestionnaire de compte dédié", text: "Un point de contact unique qui connaît vos produits, vos délais et votre niveau d'exigence." },
    ],
    steps: [
      { n: "01", title: "Premier contact", text: "Nous découvrons votre marque, vos volumes et vos délais." },
      { n: "02", title: "Échantillon & devis", text: "Nous envoyons des échantillons et fixons les tarifs." },
      { n: "03", title: "Production", text: "Nous fabriquons, finissons et contrôlons chaque unité." },
      { n: "04", title: "Livraison", text: "Marqué, emballé et expédié selon le cahier des charges." },
    ],
    cta: { label: "Devenir partenaire", href: "/quote" },
    pathLabel: "Parcours de partenariat",
    pathTitle: "Du premier contact à la livraison",
  },
  capabilities: {
    eyebrow: "Savoir-faire",
    title: { lead: "Un studio conçu pour", accent: "tout ce que vous pouvez modéliser." },
    subtitle:
      "Plusieurs technologies d'impression, des dizaines de matériaux et un banc de post-finition complet sous un même toit.",
    tech: [
      { name: "FDM / FFF", detail: "Jusqu'à 400×400×500 mm · 0,1 mm par couche", icon: "layers" },
      { name: "Résine SLA", detail: "Haut détail · 25 microns XY", icon: "droplet" },
      { name: "Multicolore", detail: "Impression couleur & double extrusion", icon: "palette" },
      { name: "Technique", detail: "Nylon · Fibre de carbone · TPU", icon: "cog" },
    ],
    materialsTitle: "Matériaux que nous imprimons",
    materialsSubtitle:
      "Plus de 40 filaments et résines en stock — vous ne trouvez pas le vôtre ? Nous le trouvons pour vous.",
    materials: [
      "PLA", "PETG", "ABS", "ASA", "Nylon (PA12)", "Nylon fibre de carbone",
      "TPU (Flexible)", "Résine (Standard)", "Résine (Tough)", "Résine (Dentaire)",
      "Chargé bois", "Chargé métal", "PC Blend", "HIPS", "PVA (Support)",
    ],
  },
  work: {
    eyebrow: "Réalisations",
    title: { lead: "Un aperçu de", accent: "ce que nous faisons." },
    subtitle:
      "Des produits dérivés de marque aux prototypes techniques — chaque projet est sur mesure, chaque pièce finie à la main.",
    items: [
      { title: "Présentoirs de marque", category: "Pour marques", image: "/images/gallery-2.png" },
      { title: "Prototype fonctionnel", category: "Sur mesure", image: "/images/gallery-1.png" },
      { title: "Série de production", category: "Petite série", image: "/images/gallery-3.png" },
      { title: "Produit portable", category: "Sur mesure", image: "/images/gallery-4.png" },
    ],
  },
  process: {
    eyebrow: "Comment ça marche",
    title: { lead: "De l'idée dans votre tête à la", accent: "pièce dans votre main." },
    steps: [
      { n: "01", title: "Partagez votre brief", text: "Envoyez un fichier, un croquis ou une description via le formulaire de devis. Indiquez quantité, matériau et délai." },
      { n: "02", title: "Devis & conseils", text: "Sous 24h, vous recevez un devis ferme plus des recommandations matériau et conception." },
      { n: "03", title: "Impression & finition", text: "Votre pièce est fabriquée, inspectée et finie selon le cahier des charges — avec photos avant expédition." },
      { n: "04", title: "Livraison", text: "Expédition suivie dans le monde entier, ou retrait en Belgique. Les réassorts sont à un message près." },
    ],
  },
  quote: {
    eyebrow: "Demander un devis",
    title: { lead: "Dites-nous ce que vous voulez", accent: "fabriquer." },
    subtitle:
      "Partagez quelques détails et nous reviendrons vers vous sous 24h avec un devis et des conseils. Sans engagement.",
    projectTypes: [
      "Prototype / R&D",
      "Pièce de remplacement",
      "Personnalisé / sur mesure",
      "Petite série",
      "Marque / merchandising",
      "Autre chose",
    ],
    reassurance: [
      { icon: "clock", title: "Réponse sous 24h", text: "Nous répondons à chaque demande sous un jour ouvré." },
      { icon: "shield-check", title: "Sans engagement", text: "Les devis sont gratuits. NDA sur demande." },
      { icon: "mail", title: "Support humain", text: "Parlez aux personnes qui impriment réellement votre pièce." },
    ],
    form: {
      name: "Votre nom",
      email: "E-mail",
      company: "Société / marque",
      projectType: "Type de projet",
      quantity: "Quantité",
      budget: "Budget (optionnel)",
      fileUrl: "Lien vers le fichier (optionnel)",
      fileHint: "STL, OBJ, STEP — ou un lien Drive / WeTransfer",
      message: "Décrivez votre projet",
      send: "Envoyer la demande",
      sending: "Envoi…",
      agree: "En envoyant, vous acceptez que nous vous contactions au sujet de votre demande.",
      pickOne: "Choisissez…",
    },
    successTitle: "Demande reçue !",
    successMsg:
      "Merci de nous avoir contactés. Notre équipe étudie votre brief et vous répond sous 24h avec un devis et les prochaines étapes.",
    sendAnother: "Envoyer une autre demande",
    errName: "Veuillez saisir votre nom",
    errEmail: "Veuillez saisir un e-mail valide",
    errProject: "Veuillez choisir un type de projet",
    errMessage: "Donnez-nous un peu plus de détails sur votre projet",
    errFile: "Collez une URL valide (https://…)",
  },
  faq: {
    eyebrow: "FAQ",
    title: { lead: "Des questions,", accent: "des réponses." },
    items: [
      { q: "Quels fichiers puis-je envoyer ?", a: "STL, OBJ, STEP et 3MF sont idéaux. Si vous n'avez qu'un croquis, une photo ou un échantillon physique, nos designers peuvent le modéliser — décrivez simplement votre besoin dans le formulaire." },
      { q: "Quelle est la commande minimum ?", a: "Il n'y en a pas. Nous imprimons volontiers une pièce unique, et nous réalisons aussi des séries de plusieurs centaines d'unités. Le prix à l'unité baisse avec la quantité." },
      { q: "Quelle est votre rapidité de livraison ?", a: "La plupart des commandes simples sont expédiées sous 2–4 jours ouvrés. Les séries et commandes de marque dépendent du volume — nous vous donnons un délai réaliste dans votre devis." },
      { q: "Livrez-vous à l'international ?", a: "Oui. Nous sommes basés en Belgique et expédions dans le monde entier avec suivi. Le retrait sur place est aussi possible sur rendez-vous." },
      { q: "Pouvez-vous signer un NDA pour un projet de marque ?", a: "Absolument. Nous travaillons régulièrement sous NDA pour les marques et agences, et pouvons proposer des productions exclusives si nécessaire." },
      { q: "Pouvez-vous assortir mes couleurs de marque ?", a: "Oui — nous stockons une large gamme de couleurs de filament et pouvons sourcer des matériaux Pantone spécifiques pour les projets de marque et merchandising." },
    ],
  },
  ctaBand: {
    title: "Une idée à imprimer ?",
    subtitle:
      "Envoyez-la-nous. Nous devisons sous 24h — sans engagement, sans jargon.",
    button: { label: "Demander un devis", href: "/quote" },
  },
  footer: {
    explore: "Explorer",
    services: "Services",
    contact: "Contact",
    madeToOrder: "Fabriqué sur mesure",
    rights: "Tous droits réservés.",
    crafted: "Conçu avec précision en Belgique",
    revamp: "Personnalisez votre marque dans",
  },

  home: {
    featured: {
      eyebrow: "De la boutique",
      title: { lead: "Pièces en vedette,", accent: "prêtes à expédier." },
      subtitle:
        "Un avant-goût de ce que nous créons. Parcourez le catalogue complet pour plus, ou commandez une pièce entièrement sur mesure.",
      viewAll: { label: "Voir tous les produits", href: "/shop" },
    },
    whatWeDo: {
      eyebrow: "Ce que nous faisons",
      title: { lead: "Deux façons de", accent: "travailler avec nous." },
      subtitle:
        "Que vous ayez besoin d'une pièce unique ou d'une production de marque, nous avons un parcours pour vous.",
      custom: {
        title: "Sur mesure",
        text: "Prototypes uniques, pièces de remplacement, cadeaux personnalisés et petites séries — conçus, imprimés et finis selon vos besoins.",
        cta: { label: "Découvrir le sur mesure", href: "/custom-orders" },
      },
      brands: {
        title: "Pour marques",
        text: "Fabrication en marque blanche, tarifs de gros et collaborations sous licence — calés sur la feuille de route de votre marque.",
        cta: { label: "Devenir partenaire", href: "/brands" },
      },
    },
    processTeaser: {
      eyebrow: "Comment ça marche",
      title: { lead: "De l'idée à la pièce en", accent: "quatre étapes." },
      subtitle:
        "Un processus simple et transparent — partagez votre brief, recevez un devis sous 24h, nous imprimons et finissons, puis expédition dans le monde entier.",
      cta: { label: "Voir le processus complet", href: "/process" },
    },
  },

  about: {
    eyebrow: "À propos",
    title: { lead: "Un studio belge obsédé par", accent: "rendre les choses réelles." },
    intro:
      "Loboratorium est un studio d'impression 3D sur mesure basé en Belgique. Nous aidons créateurs, marques et entreprises à transformer des idées en objets physiques — du prototype unique à la production en série.",
    story: [
      "Ce qui a commencé comme un projet de garage s'est rapidement transformé en un studio complet. Nous avons investi dans plusieurs technologies d'impression, un mur de matériaux et un banc de post-finition — car une bonne impression n'est pas finie quand l'imprimante s'arrête.",
      "Aujourd'hui, nous travaillons avec tout le monde : de l'amateur avec un simple croquis aux marques internationales qui commandent des milliers d'unités. Le fil conducteur : nous traitons chaque pièce comme si nous allions l'utiliser nous-mêmes.",
      "Nous croyons que la fabrication additive doit être accessible, rapide et vraiment utile. Pas de jargon, pas de devis gonflés — juste des pièces bien faites, livrées à temps.",
    ],
    values: [
      { icon: "sparkles", title: "La qualité d'abord", text: "Chaque pièce est inspectée et finie à la main avant de quitter le studio." },
      { icon: "clock", title: "Livraison rapide", text: "La plupart des commandes sont expédiées en jours, pas en semaines. Devis sous 24h." },
      { icon: "shield-check", title: "Honnête & confidentiel", text: "Tarification transparente et accords de confidentialité pour les projets de marque. Votre propriété intellectuelle reste la vôtre." },
      { icon: "boxes", title: "Un matériau pour chaque projet", text: "Plus de 40 filaments et résines en stock — et nous trouvons tout le reste." },
    ],
    cta: { label: "Démarrer un projet", href: "/quote" },
  },

  pageMeta: {
    home: "Accueil",
    shop: "Boutique",
    product: "Produit",
    customOrders: "Sur mesure",
    brands: "Pour marques",
    capabilities: "Savoir-faire",
    work: "Réalisations",
    process: "Processus",
    faq: "FAQ",
    quote: "Demander un devis",
    about: "À propos",
  },

  common: {
    home: "Accueil",
    backToHome: "Retour à l'accueil",
    viewAll: "Voir tout",
    exploreShop: "Parcourir la boutique",
    notFoundTitle: "Page introuvable",
    notFoundText: "La page que vous cherchez n'existe pas ou a été déplacée.",
  },
};

export const translations: Record<Locale, Content> = { en, nl, fr };
