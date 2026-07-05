"use client";

/* =============================================================================
 *  LOCALE INITIALIZER
 *  ---------------------------------------------------------------------------
 *  On a visitor's FIRST visit (no language ever chosen/stored), auto-selects
 *  the language from their location + browser preferences, then persists it.
 *  Runs once, client-side, and never overrides an explicit choice.
 * ========================================================================== */

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { resolveInitialLocale } from "@/lib/locale-detect";

export function LocaleInitializer() {
  const autoSetLocale = useI18n((s) => s.autoSetLocale);

  useEffect(() => {
    // Wait for zustand/persist to hydrate from localStorage, then check if a
    // language was ever chosen. `chosen` is false only on a genuine first visit.
    const run = async () => {
      if (useI18n.getState().chosen) return;

      const navLangs =
        typeof navigator !== "undefined"
          ? navigator.languages?.length
            ? navigator.languages
            : [navigator.language]
          : [];

      let country: string | null = null;
      try {
        const res = await fetch("/api/geo");
        if (res.ok) {
          const data = await res.json();
          country = data?.country ?? null;
        }
      } catch {
        // ignore — navigator.language fallback handles it
      }

      // Re-check in case the user clicked the switcher while geo was resolving.
      if (useI18n.getState().chosen) return;

      autoSetLocale(resolveInitialLocale(country, navLangs));
    };

    // Defer a tick so persist hydration has settled.
    const id = setTimeout(run, 0);
    return () => clearTimeout(id);
  }, [autoSetLocale]);

  return null;
}
