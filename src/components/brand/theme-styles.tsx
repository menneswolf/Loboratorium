/* =============================================================================
 *  THEME STYLES  (server component)
 *  ---------------------------------------------------------------------------
 *  Reads the brand config (src/config/brand.ts) and injects it as CSS custom
 *  properties on :root. This is the bridge between your design file and the
 *  whole UI — change a color/font in brand.ts and it lands here instantly.
 * ========================================================================== */

import { brand } from "@/config/brand";
import { fontVarNames } from "@/lib/fonts";

export function ThemeStyles() {
  const c = brand.colors;

  const css = `:root{
  /* Brand palette (from src/config/brand.ts) */
  --brand-accent:${c.accent};
  --brand-accent-2:${c.accent2};
  --brand-accent-soft:${c.accentSoft};
  --brand-surface:${c.surface};
  --brand-surface-alt:${c.surfaceAlt};
  --brand-surface-alt-2:${c.surfaceAlt2};
  --brand-ink:${c.ink};
  --brand-muted:${c.muted};
  --brand-border:${c.border};

  /* Active fonts (from src/config/brand.ts) */
  --font-heading:var(--${fontVarNames[brand.fonts.heading]});
  --font-body:var(--${fontVarNames[brand.fonts.body]});

  /* Map brand palette onto the shadcn/ui token system */
  --background:var(--brand-surface);
  --foreground:var(--brand-ink);
  --card:var(--brand-surface-alt);
  --card-foreground:var(--brand-ink);
  --popover:var(--brand-surface-alt-2);
  --popover-foreground:var(--brand-ink);
  --primary:var(--brand-accent);
  --primary-foreground:#ffffff;
  --secondary:var(--brand-surface-alt-2);
  --secondary-foreground:var(--brand-ink);
  --muted:var(--brand-surface-alt);
  --muted-foreground:var(--brand-muted);
  --accent:var(--brand-surface-alt-2);
  --accent-foreground:var(--brand-ink);
  --border:var(--brand-border);
  --input:var(--brand-border);
  --ring:var(--brand-accent);
  --radius:0.85rem;
}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
