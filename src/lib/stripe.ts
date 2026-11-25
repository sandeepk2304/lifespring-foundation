import { createHmac, timingSafeEqual } from "node:crypto";

// Stripe over its REST API. STRIPE_API_BASE exists so tests can point at stripe-mock.
const base = () => process.env.STRIPE_API_BASE ?? "https://api.stripe.com";

export async function stripe<T>(path: string, secret: string, form?: URLSearchParams): Promise<{ ok: boolean; body: T & { error?: { message?: string } } }> {
  const res = await fetch(`${base()}/v1/${path}`, {
    method: form ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${secret}`,
      ...(form && { "Content-Type": "application/x-www-form-urlencoded" }),
    },
    body: form,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  return { ok: res.ok, body: await res.json() };
}

const TOLERANCE_SECONDS = 300;

/**
 * Checks a Stripe-Signature header against the raw request body.
 * Any v1 signature may match: Stripe sends two while a secret is being rolled.
 */
export function verifySignature(payload: string, header: string | null, secret: string, now = Date.now()): boolean {
  if (!header) return false;
  const parts = header.split(",").map((p) => p.trim().split("=", 2));
  const timestamp = parts.find(([k]) => k === "t")?.[1];
  if (!timestamp || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest();
  return parts
    .filter(([k]) => k === "v1")
    .some(([, v]) => {
      const given = Buffer.from(v ?? "", "hex");
      return given.length === expected.length && timingSafeEqual(given, expected);
    });
}
