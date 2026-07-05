import { NextResponse } from "next/server";

/* =============================================================================
 *  GEO
 *  ---------------------------------------------------------------------------
 *  Returns a best-effort ISO country code for the caller, used only to pick a
 *  sensible default language on a visitor's first visit. Tries edge/CDN geo
 *  headers first (Vercel, Cloudflare, etc.); if none are present (e.g. local
 *  dev) it falls back to a free IP lookup, and finally to null. Never blocks
 *  the UI — the client has its own navigator.language fallback.
 * ========================================================================== */

export const dynamic = "force-dynamic";

function headerCountry(req: Request): string | null {
  const h = req.headers;
  return (
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code") ||
    null
  );
}

function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

export async function GET(req: Request) {
  // 1. CDN/edge geo header (instant, no network)
  const fromHeader = headerCountry(req);
  if (fromHeader) {
    return NextResponse.json({ country: fromHeader.toUpperCase() });
  }

  // 2. Best-effort IP lookup (skips private/localhost IPs)
  const ip = clientIp(req);
  const isPublic =
    ip &&
    !ip.startsWith("127.") &&
    !ip.startsWith("10.") &&
    !ip.startsWith("192.168.") &&
    ip !== "::1";

  if (isPublic) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`https://ipapi.co/${ip}/country/`, {
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const country = (await res.text()).trim();
        if (country && country.length === 2) {
          return NextResponse.json({ country: country.toUpperCase() });
        }
      }
    } catch {
      // ignore — fall through to null
    }
  }

  return NextResponse.json({ country: null });
}
