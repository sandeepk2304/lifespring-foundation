import { donations, site } from "@/config/site";
import { isValidTaxId, normaliseTaxId } from "@/lib/donor";

/**
 * Starts a donation. In order of preference:
 * 1. Stripe Checkout (STRIPE_SECRET_KEY set): one-time payment or monthly subscription.
 * 2. A hosted payment link from the config (Giving.sg, Stripe Payment Link…).
 * 3. Demo mode: tells the visitor what would have happened.
 * The amount is always validated here, never trusted from the browser.
 */
export async function POST(request: Request) {
  let body: { amount?: unknown; frequency?: unknown; donorName?: unknown; taxId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const frequency = body.frequency === "monthly" ? "monthly" : "once";
  if (!Number.isInteger(amount) || amount < donations.minimum || amount > 100_000) {
    return Response.json({ ok: false, error: `Please choose an amount between ${donations.symbol}${donations.minimum} and ${donations.symbol}100,000.` }, { status: 422 });
  }

  // Optional details for IRAS tax-deduction filing; validated, then passed to the payment record only.
  const taxId = typeof body.taxId === "string" ? normaliseTaxId(body.taxId) : "";
  const donorName = typeof body.donorName === "string" ? body.donorName.trim().slice(0, 100) : "";
  if (taxId && (!isValidTaxId(taxId) || donorName.length < 2)) {
    return Response.json({ ok: false, error: "Please check your name and NRIC, FIN or UEN." }, { status: 422 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret) {
    const origin = new URL(request.url).origin;
    const form = new URLSearchParams({
      mode: frequency === "monthly" ? "subscription" : "payment",
      success_url: `${origin}/donate/thank-you?frequency=${frequency}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?amount=${amount}`,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": donations.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(amount * 100),
      "line_items[0][price_data][product_data][name]": `${frequency === "monthly" ? "Monthly gift" : "Gift"} to ${site.name}`,
      "metadata[frequency]": frequency,
      "metadata[tax_deduction]": taxId ? "yes" : "no",
      "metadata[donor_name]": donorName,
      "metadata[tax_id]": taxId,
      submit_type: frequency === "monthly" ? "" : "donate",
    });
    if (frequency === "monthly") form.set("line_items[0][price_data][recurring][interval]", "month");
    else form.set("customer_creation", "always");
    for (const [k, v] of [...form.entries()]) if (v === "") form.delete(k);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const session = await res.json();
    if (!res.ok || !session.url) {
      console.error("Stripe checkout failed", session?.error?.message);
      return Response.json({ ok: false, error: "We couldn't start checkout. Please try again or email us." }, { status: 502 });
    }
    return Response.json({ ok: true, url: session.url });
  }

  if (donations.checkoutUrl) {
    return Response.json({ ok: true, url: donations.checkoutUrl.replace("{amount}", String(amount)).replace("{frequency}", frequency) });
  }

  if (site.demo) return Response.json({ ok: true, demo: true });
  return Response.json({ ok: false, error: `Online giving is being set up. Please email ${site.email} to give.` }, { status: 503 });
}
