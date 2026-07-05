"use client";

/* =============================================================================
 *  MOTION PRIMITIVES
 *  ---------------------------------------------------------------------------
 *  Small Framer Motion helpers used across the site for sleek, consistent
 *  scroll-triggered animations. All respect prefers-reduced-motion.
 * ========================================================================== */

import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---- Reveal: fades + slides content into view on scroll ------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // useInView observes on mount, so it reliably fires for content that is
  // already in the viewport on first paint (the whileInView prop did not).
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const MotionTag = motion[as];
  const shownState = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  return (
    <MotionTag
      // motion[as] is a union component; the shared HTMLElement ref is fine at
      // runtime but doesn't line up with the intersected ref type.
      ref={ref as never}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? shownState : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ---- Stagger container + item ------------------------------------------- */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial={reduce ? "show" : "hidden"}
      animate={reduce || inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ---- Magnetic / hover lift card ----------------------------------------- */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("group", className)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Marquee (infinite scroll strip) ------------------------------------ */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-3">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border bg-card px-5 py-2 text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
