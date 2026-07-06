/** Normalize a free-text country (any of EN/NL/FR spellings or a 2-letter code)
 *  to an ISO-3166 alpha-2 code. Used for per-country shipping rates and labels. */
export function countryCode(country: string): string {
  const n = country.trim().toLowerCase();
  const map: Record<string, string> = {
    belgium: "BE", belgië: "BE", belgie: "BE", belgique: "BE", be: "BE",
    netherlands: "NL", nederland: "NL", "pays-bas": "NL", nl: "NL",
    france: "FR", frankrijk: "FR", fr: "FR",
    germany: "DE", duitsland: "DE", allemagne: "DE", de: "DE",
    luxembourg: "LU", luxemburg: "LU", lu: "LU",
  };
  return map[n] ?? country.trim().slice(0, 2).toUpperCase();
}
