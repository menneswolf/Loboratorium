"use client";

/* =============================================================================
 *  SECTION HEADING
 *  ---------------------------------------------------------------------------
 *  Consistent eyebrow + title + subtitle block used at the top of each section.
 * ========================================================================== */

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
          <span className="h-px w-6 bg-brand-accent" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
