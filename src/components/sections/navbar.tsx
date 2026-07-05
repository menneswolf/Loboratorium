"use client";

/* =============================================================================
 *  NAVBAR
 *  ---------------------------------------------------------------------------
 *  Sticky glass navigation. Logo + translated nav links + language switcher
 *  + cart button (with badge) + primary CTA. Mobile menu uses shadcn Sheet.
 * ========================================================================== */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ArrowRight, ShoppingBag } from "lucide-react";
import { brand } from "@/config/brand";
import { useT } from "@/lib/i18n";
import { useCart, useCartCount } from "@/lib/cart";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/brand/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCartCount();
  const openDrawer = useCart((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-2 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <Link href="#top" className="rounded-xl" aria-label={`${brand.name} home`}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {t.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster: language + cart + CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />

          {/* Cart */}
          <button
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card/40 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <ShoppingBag className="size-4" />
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-brand-accent px-1 font-heading text-[10px] font-bold text-primary-foreground">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </button>

          {/* Desktop CTA */}
          <Button asChild size="sm" className="hidden lg:inline-flex group">
            <Link href="#quote">
              {t.hero.primaryCta.label}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-border bg-card p-0"
            >
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {t.nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 px-4">
                <LanguageSwitcher className="w-full justify-center" />
              </div>
              <div className="mt-auto p-6">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="#quote">{t.hero.primaryCta.label}</Link>
                  </Button>
                </SheetClose>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {brand.contact.email}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
