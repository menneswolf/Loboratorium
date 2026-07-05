"use client";

/* =============================================================================
 *  i18n PROVIDER + useT HOOK
 *  ---------------------------------------------------------------------------
 *  Stores the active locale in localStorage (via Zustand `persist`) so it
 *  survives reloads, and exposes `useT()` returning the translated content
 *  object for the current language. Zustand persist hydrates AFTER the first
 *  render, so the server and first client render share the default ('en') —
 *  this avoids hydration mismatches, then updates to the saved locale.
 * ========================================================================== */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  translations,
  type Content,
  type Locale,
} from "@/config/translations";

export type { Locale, Content } from "@/config/translations";
export { locales, localeNames, localeFlags } from "@/config/translations";

type I18nState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "lobo-locale",
      // Only persist the locale, not methods
      partialize: (s) => ({ locale: s.locale }) as I18nState,
    }
  )
);

/**
 * The main translation hook. Returns the content object for the active
 * language plus locale controls. Use `t` exactly like the old `content`.
 */
export function useT() {
  const locale = useI18n((s) => s.locale);
  const setLocale = useI18n((s) => s.setLocale);
  return {
    t: translations[locale],
    locale,
    setLocale,
  };
}
