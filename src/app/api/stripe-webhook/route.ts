import { site } from "@/config/site";
import { sendMail } from "@/lib/mail";
import { verifySignature } from "@/lib/stripe";

/**
 * Stripe calls this when money has moved, and emails the team. The donor's browser is never proof
 * of payment: people close the tab, and bank debits confirm days later.
 *
 * Events to send: checkout.session.completed, checkout.session.async_payment_succeeded,
 * checkout.session.async_payment_failed, invoice.paid, invoice.payment_failed.
 *
 * Stripe may send an event twice. With no database to remember event ids, the email carries an
 * idempotency key, so Resend drops a repeat within 24 hours.
 */
type StripeObject = {
  id: string;
  payment_status?: string;
  amount_total?: number | null;
  amount_paid?: number;
  amount_due?: number;
  currency?: string | null;
  mode?: string;
  billing_reason?: string;
  customer_email?: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  metadata?: Record<string, string> | null;
};
type StripeEvent = { id: string; type: string; livemode: boolean; data: { object: StripeObject } };

// Zero-decimal currencies need no division; the template's default, SGD, has two decimals.
const amount = (minor: number | null | undefined, currency: string | null | undefined) =>
  new Intl.NumberFormat("en-SG", { style: "currency", currency: (currency ?? "sgd").toUpperCase() }).format((minor ?? 0) / 100);

function describe(type: string, o: StripeObject): { subject: string; lines: string[] } | null {
  const email = o.customer_details?.email ?? o.customer_email ?? "not given";
  // Never the name or tax id here: those stay sealed until the finance export.
  const tax = o.metadata?.tax_deduction === "yes" ? "yes" : "no";

  switch (type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      // Completed does not mean paid: a bank debit completes first and pays later.
      if (o.payment_status !== "paid") return null;
      const monthly = o.mode === "subscription";
      const sum = amount(o.amount_total, o.currency);
      return {
        subject: monthly ? `New monthly gift: ${sum}` : `New gift: ${sum}`,
        lines: [`Amount: ${sum}${monthly ? " a month" : ""}`, `Donor email: ${email}`, `Tax deduction requested: ${tax}`],
      };
    }
    case "checkout.session.async_payment_failed":
      return { subject: "A gift did not go through", lines: [`Amount: ${amount(o.amount_total, o.currency)}`, `Donor email: ${email}`] };
    case "invoice.paid":
      // The first invoice is already reported by checkout.session.completed.
      if (o.billing_reason !== "subscription_cycle") return null;
      return { subject: `Monthly gift renewed: ${amount(o.amount_paid, o.currency)}`, lines: [`Amount: ${amount(o.amount_paid, o.currency)}`, `Donor email: ${email}`] };
    case "invoice.payment_failed":
      return { subject: "A monthly gift failed", lines: [`Amount due: ${amount(o.amount_due, o.currency)}`, `Donor email: ${email}`, "Stripe may retry, depending on your billing settings."] };
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook is not configured", { status: 503 });

  // The raw text: parsing and re-serialising would change the bytes that were signed.
  const payload = await request.text();
  if (!verifySignature(payload, request.headers.get("stripe-signature"), secret)) {
    return new Response("Bad signature", { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response("Bad payload", { status: 400 });
  }

  const object = event.data?.object;
  const note = object ? describe(event.type, object) : null;
  if (!note) return Response.json({ received: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DONATIONS_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    console.warn(`Stripe ${event.type} ${object.id}: no email set up, so nobody was told`);
    return Response.json({ received: true });
  }

  const sent = await sendMail({
    apiKey,
    to,
    from: process.env.ENQUIRY_FROM_EMAIL ?? `${site.shortName} website <onboarding@resend.dev>`,
    subject: `${event.livemode ? "" : "[Test] "}${note.subject}`,
    text: [...note.lines, `Stripe reference: ${object.id}`].join("\n"),
    // Type and object, not the event id: Stripe can send two events for the same change.
    idempotencyKey: `${event.type}:${object.id}`,
  });
  // A failure status makes Stripe try again later.
  return sent ? Response.json({ received: true }) : new Response("Could not send the notification", { status: 500 });
}
