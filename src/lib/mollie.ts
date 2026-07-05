import createMollieClient, { type MollieClient } from "@mollie/api-client";

/* =============================================================================
 *  MOLLIE
 *  ---------------------------------------------------------------------------
 *  Thin server-only wrapper around the Mollie client. Payments are created
 *  after an order is persisted, and confirmed via webhook (never via the
 *  browser redirect). Gracefully reports "not configured" when MOLLIE_API_KEY
 *  is unset so the site still works in email-only mode during setup.
 * ========================================================================== */

export class MollieNotConfiguredError extends Error {
  constructor() {
    super("MOLLIE_API_KEY is not set. Add it to .env to enable online payments.");
    this.name = "MollieNotConfiguredError";
  }
}

let client: MollieClient | null = null;

export function isMollieConfigured(): boolean {
  return Boolean(process.env.MOLLIE_API_KEY);
}

export function getMollie(): MollieClient {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) throw new MollieNotConfiguredError();
  if (!client) client = createMollieClient({ apiKey });
  return client;
}

/** Format a EUR amount for the Mollie API (two-decimal string). */
export function eur(amount: number): { currency: "EUR"; value: string } {
  return { currency: "EUR", value: amount.toFixed(2) };
}
