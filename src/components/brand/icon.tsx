/* =============================================================================
 *  ICON RESOLVER
 *  ---------------------------------------------------------------------------
 *  Maps the string icon keys used in src/config/brand.ts → content to Lucide
 *  icons. Add a new key here if you add a new icon to the content config.
 * ========================================================================== */

import {
  Boxes,
  Wrench,
  Gift,
  Factory,
  PenTool,
  Sparkles,
  Handshake,
  Tag,
  ShieldCheck,
  Headset,
  Layers,
  Droplet,
  Palette,
  Cog,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Mail,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";

/* TikTok isn't in Lucide, so we ship a small inline glyph. */
function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 0h-3.2v13.1a2.6 2.6 0 1 1-2.6-2.6c.24 0 .48.03.7.1V7.4a5.9 5.9 0 1 0 5.1 5.9V7.7a7.4 7.4 0 0 0 4.3 1.4V5.9a4.3 4.3 0 0 1-4.3-4.3V0z" />
    </svg>
  );
}

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  boxes: Boxes,
  wrench: Wrench,
  gift: Gift,
  factory: Factory,
  "pen-tool": PenTool,
  sparkles: Sparkles,
  handshake: Handshake,
  tag: Tag,
  "shield-check": ShieldCheck,
  headset: Headset,
  layers: Layers,
  droplet: Droplet,
  palette: Palette,
  cog: Cog,
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  clock: Clock,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp className={className} />;
}
