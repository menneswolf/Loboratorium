"use client";

/* =============================================================================
 *  FOOTER
 *  ---------------------------------------------------------------------------
 *  Brand summary, quick links, contact + socials, legal line. Sticks to the
 *  bottom of the viewport on short pages (paired with the page flex wrapper).
 * ========================================================================== */

import Link from "next/link";
import { brand } from "@/config/brand";
import { useT } from "@/lib/i18n";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/brand/icon";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand.description}
            </p>
            <div className="mt-5 flex gap-2">
              {brand.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-brand-accent/40 hover:text-brand-accent"
                >
                  <Icon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              {t.footer.explore}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              {t.footer.services}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.customOrders.items
                .slice(0, 5)
                .map((item) => (
                  <li key={item.title}>
                    <Link
                      href="/custom-orders"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li>{brand.contact.location}</li>
              <li className="text-xs text-muted-foreground/70">
                {brand.contact.responseTime}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {brand.name}. {t.footer.rights}
          </p>
          <p>
            {t.footer.crafted} ·{" "}
            <span className="text-muted-foreground/70">
              {t.footer.revamp} <code className="text-foreground/80">src/config/brand.ts</code>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
