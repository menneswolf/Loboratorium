/** Resolve the public base URL for building redirect/webhook URLs.
 *  Prefers PUBLIC_BASE_URL (needed so webhooks reach a real host / tunnel),
 *  otherwise derives the origin from the incoming request. */
export function baseUrl(req: Request): string {
  const env = process.env.PUBLIC_BASE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return new URL(req.url).origin;
}
