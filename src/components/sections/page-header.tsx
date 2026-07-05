"use client";

/* =============================================================================
 *  PAGE HEADER + PAGE SHELL
 *  ---------------------------------------------------------------------------
 *  Consistent top-of-page header for all sub-pages: spacer for the fixed
 *  navbar, breadcrumb, eyebrow + title + subtitle. PageShell wraps page body
 *  with the spacer + max-width container.
 * ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useT } from "@/lib/i18n";
import { brand } from "@/config/brand";
import type { Title } from "@/config/translations";

/** Map a pathname to its pageMeta key for the breadcrumb label. */
function pathToMetaKey(path: string): keyof ReturnType<typeof useT>["t"]["pageMeta"] | null {
  if (path === "/" || path === "") return "home";
  if (path.startsWith("/shop/")) return "product";
  if (path.startsWith("/shop")) return "shop";
  if (path.startsWith("/custom-orders")) return "customOrders";
  if (path.startsWith("/brands")) return "brands";
  if (path.startsWith("/capabilities")) return "capabilities";
  if (path.startsWith("/work")) return "work";
  if (path.startsWith("/process")) return "process";
  if (path.startsWith("/faq")) return "faq";
  if (path.startsWith("/quote")) return "quote";
  if (path.startsWith("/about")) return "about";
  return null;
}

export function Breadcrumb({ productName }: { productName?: string }) {
  const { t } = useT();
  const pathname = usePathname() || "/";
  const metaKey = pathToMetaKey(pathname);
  const isHome = pathname === "/" || pathname === "";

  if (isHome) return null;

  const crumbLabel =
    metaKey === "product" && productName
      ? productName
      : metaKey
      ? t.pageMeta[metaKey]
      : "";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-foreground"
      >
        <Home className="size-3.5" />
        <span className="sr-only sm:not-sr-only">{t.common.home}</span>
      </Link>
      {metaKey && metaKey !== "home" ? (
        <>
          <ChevronRight className="size-3.5 text-muted-foreground/50" />
          {metaKey === "product" ? (
            <>
              <Link
                href="/shop"
                className="transition-colors hover:text-foreground"
              >
                {t.pageMeta.shop}
              </Link>
              <ChevronRight className="size-3.5 text-muted-foreground/50" />
              <span className="truncate font-medium text-foreground">{crumbLabel}</span>
            </>
          ) : (
            <span className="font-medium text-foreground">{crumbLabel}</span>
          )}
        </>
      ) : null}
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  productName,
}: {
  eyebrow?: string;
  title?: Title;
  subtitle?: string;
  productName?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="accent-glow absolute -top-20 left-1/2 h-60 w-[640px] -translate-x-1/2" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumb productName={productName} />
        {title ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            {eyebrow ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
                <span className="h-px w-6 bg-brand-accent" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {title.lead}{" "}
              {title.accent ? (
                <span className="text-gradient">{title.accent}</span>
              ) : null}{" "}
              {title.tail}
            </h1>
            {subtitle ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </motion.div>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </header>
  );
}

/** Standard page body wrapper used by all sub-pages. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}

export { brand };
