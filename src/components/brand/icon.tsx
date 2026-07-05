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
  Mail,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
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
