/* =============================================================================
 *  LOCALE DETECTION
 *  ---------------------------------------------------------------------------
 *  Best-effort automatic language selection for a visitor's FIRST visit.
 *  Combines two signals:
 *    1. Geo-IP country (from /api/geo) — "where are you".
 *    2. navigator.language(s) — "what do you read".
 *  Falls back gracefully to English. After the first visit the choice is
 *  persisted (see i18n.ts) and this is never used again.
 * ========================================================================== */

import type { Locale } from "@/config/translations";

/** Map an ISO country code to a locale. Belgium is bilingual, so callers
 *  should pass the browser language to disambiguate NL vs FR there. */
export function localeFromCountry(
  country: string | null | undefined,
  browserLang?: string
): Locale | null {
  if (!country) return null;
  const cc = country.toUpperCase();

  // Belgium: Flanders (NL) + Wallonia (FR). Use the browser language to pick,
  // defaulting to Dutch (Flanders is the larger region).
  if (cc === "BE") {
    if (browserLang?.toLowerCase().startsWith("fr")) return "fr";
    if (browserLang?.toLowerCase().startsWith("nl")) return "nl";
    return "nl";
  }

  const nlCountries = ["NL"]; // Netherlands
  const frCountries = ["FR", "LU", "MC"]; // France, Luxembourg, Monaco

  if (nlCountries.includes(cc)) return "nl";
  if (frCountries.includes(cc)) return "fr";
  return "en";
}

/** Map browser language preferences to a supported locale. */
export function localeFromNavigator(langs: readonly string[]): Locale | null {
  for (const raw of langs) {
    const l = raw.toLowerCase();
    if (l.startsWith("nl")) return "nl";
    if (l.startsWith("fr")) return "fr";
    if (l.startsWith("en")) return "en";
  }
  return null;
}

/** Resolve the best initial locale from both signals. Geo wins when decisive,
 *  browser language disambiguates and acts as the fallback. */
export function resolveInitialLocale(
  country: string | null | undefined,
  navigatorLangs: readonly string[]
): Locale {
  const browserPrimary = navigatorLangs[0];
  const geo = localeFromCountry(country, browserPrimary);
  if (geo) return geo;
  return localeFromNavigator(navigatorLangs) ?? "en";
}
