import { NextResponse } from "next/server";

/* =============================================================================
 *  RATE LIMIT
 *  ---------------------------------------------------------------------------
 *  Simple in-memory sliding-window limiter, keyed by IP + bucket name. Good
 *  enough for a small business site on a single server instance — no external
 *  service needed. Resets on server restart.
 * ========================================================================== */

const WINDOW_MS = 60_000;
const MAX_REQUESTS: Record<string, number> = {
  orders: 10,
  quote: 10,
  upload: 20,
  coupon: 20,
  "admin-generate": 20,
};
const DEFAULT_MAX = 30;

const hits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Returns a 429 response if the caller has exceeded the bucket's limit, else null. */
export function rateLimit(req: Request, bucket: string): NextResponse | null {
  const ip = getClientIp(req);
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const max = MAX_REQUESTS[bucket] ?? DEFAULT_MAX;

  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= max) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  return null;
}
