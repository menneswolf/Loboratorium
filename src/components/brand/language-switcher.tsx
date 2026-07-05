"use client";

/* =============================================================================
 *  LANGUAGE SWITCHER
 *  ---------------------------------------------------------------------------
 *  Compact dropdown that switches the active language instantly (no reload).
 *  Reads/writes the locale via the i18n Zustand store (persisted).
 * ========================================================================== */

import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useI18n((s) => s.locale);
  const setLocale = useI18n((s) => s.setLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card/40 px-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground",
          className
        )}
        aria-label="Change language"
      >
        <Globe className="size-4" />
        <span className="font-heading text-xs font-bold">
          {localeFlags[locale]}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {locales.map((l: Locale) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2">
              <span className="font-heading text-xs font-bold text-muted-foreground">
                {localeFlags[l]}
              </span>
              {localeNames[l]}
            </span>
            {l === locale ? <Check className="size-4 text-brand-accent" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
