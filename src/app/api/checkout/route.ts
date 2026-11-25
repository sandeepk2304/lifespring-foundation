import { donations, site } from "@/config/site";
import { isValidTaxId, normaliseTaxId } from "@/lib/donor";
import { donorKey, MAX_SEALED, sealDonor } from "@/lib/donor-crypto";
import { stripe } from "@/lib/stripe";

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

  // Optional details for IRAS tax-deduction filing. Validated here and sealed before they leave.
  const taxId = typeof body.taxId === "string" ? normaliseTaxId(body.taxId) : "";
  const donorName = typeof body.donorName === "string" ? body.donorName.trim().slice(0, 100) : "";
  if (taxId && (!isValidTaxId(taxId) || donorName.length < 2)) {
    return Response.json({ ok: false, error: "Please check your name and NRIC, FIN or UEN." }, { status: 422 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret) {
    let sealed = "";
    if (taxId) {
      const key = donorKey();
      sealed = key ? sealDonor({ name: donorName, taxId }, key) : "";
      if (!key) {
        // Taking the gift and losing the tax details would be worse than asking.
        console.error("DONOR_DATA_KEY is missing or not 32 bytes of base64");
        return Response.json({ ok: false, error: `We can't take tax details right now. Please untick the box to give today, or email ${site.email}.` }, { status: 503 });
      }
      if (sealed.length > MAX_SEALED) {
        return Response.json({ ok: false, error: "That name is too long for us to file. Please shorten it." }, { status: 422 });
      }
    }

    const origin = new URL(request.url).origin;
    const form = new URLSearchParams({
      mode: frequency === "monthly" ? "subscription" : "payment",
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?amount=${amount}`,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": donations.currency.toLowerCase(),
      "line_items[0][price_data][unit_amount]": String(amount * 100),
      "line_items[0][price_data][product_data][name]": `${frequency === "monthly" ? "Monthly gift" : "Gift"} to ${site.name}`,
      "metadata[frequency]": frequency,
      "metadata[tax_deduction]": taxId ? "yes" : "no",
      "metadata[donor]": sealed,
      submit_type: frequency === "monthly" ? "" : "donate",
    });
    if (frequency === "monthly") {
      form.set("line_items[0][price_data][recurring][interval]", "month");
      // Copied onto every invoice, so each renewal can be matched to its donor.
      form.set("subscription_data[metadata][donor]", sealed);
    } else {
      form.set("customer_creation", "always");
    }
    for (const [k, v] of [...form.entries()]) if (v === "") form.delete(k);

    const session = await stripe<{ url?: string }>("checkout/sessions", secret, form).catch(() => null);
    if (!session?.ok || !session.body.url) {
      console.error("Stripe checkout failed", session?.body.error?.message ?? "no answer");
      return Response.json({ ok: false, error: "We couldn't start checkout. Please try again or email us." }, { status: 502 });
    }
    return Response.json({ ok: true, url: session.body.url });
  }

  if (donations.checkoutUrl) {
    // The hosted page has its own form; a tax id sent from here would be dropped without a word.
    if (taxId) return Response.json({ ok: false, error: "Tax details are collected on the next page. Please untick the box to continue." }, { status: 422 });
    return Response.json({ ok: true, url: donations.checkoutUrl.replace("{amount}", String(amount)).replace("{frequency}", frequency) });
  }

  if (site.demo) return Response.json({ ok: true, demo: true });
  return Response.json({ ok: false, error: `Online giving is being set up. Please email ${site.email} to give.` }, { status: 503 });
}
