/* =============================================================================
 *  LOGO
 *  ---------------------------------------------------------------------------
 *  Reads brand config and renders the mark + optional wordmark. Swapping the
 *  logo is done in src/config/brand.ts → brand.logo.
 * ========================================================================== */

import Image from "next/image";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ className, showWordmark = true, size }: LogoProps) {
  const dim = size ?? brand.logo.width;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        width={dim}
        height={dim}
        priority
        className="shrink-0 drop-shadow-[0_0_14px_rgba(255,106,26,0.35)]"
      />
      {showWordmark && brand.logo.text ? (
        <span className="font-heading text-[1.05rem] font-bold tracking-tight text-foreground">
          {brand.logo.text}
        </span>
      ) : null}
    </span>
  );
}
