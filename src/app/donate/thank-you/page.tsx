import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { SunShape } from "@/components/site/blocks";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

type Gift = "paid" | "pending" | "unknown";
type Session = { payment_status: string; status: string; mode: string };

/** Asks Stripe what happened. The address bar is not proof: anyone can open this page. */
async function lookUp(sessionId: unknown): Promise<{ gift: Gift; monthly: boolean }> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return { gift: site.demo ? "paid" : "unknown", monthly: false };
  if (typeof sessionId !== "string" || !/^cs_(test|live)_[A-Za-z0-9]{1,200}$/.test(sessionId)) return { gift: "unknown", monthly: false };

  const res = await stripe<Session>(`checkout/sessions/${sessionId}`, secret).catch(() => null);
  if (!res?.ok) return { gift: "unknown", monthly: false };
  const { payment_status, status, mode } = res.body;
  const gift = payment_status === "paid" ? "paid" : status === "complete" ? "pending" : "unknown";
  return { gift, monthly: mode === "subscription" };
}

const copy: Record<Gift, { title: string; em: string; body: string }> = {
  paid: { title: "Thank you.", em: "Truly.", body: "Your gift is on its way to families and seniors who need it. We'll write in a few months to show you what it made possible." },
  pending: { title: "Thank you.", em: "Nearly there.", body: "Your bank is still confirming the payment, which can take a few days. There is nothing more you need to do." },
  unknown: { title: "Thank you", em: "for stopping by.", body: "We couldn't confirm a payment from this page. If you have just given, your bank or card statement will show it, and you can email us to check." },
};

export default async function ThankYouPage({ searchParams }: PageProps<"/donate/thank-you">) {
  const { session_id } = await searchParams;
  const { gift, monthly } = await lookUp(session_id);
  const { title, em, body } = copy[gift];
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <SunShape className="w-72" />
      <h1 className="title-1 mt-6 text-ink">{title} <em className="text-sunrise">{em}</em></h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">{body}</p>
      {gift === "paid" && !monthly && (
      <div className="mt-10 w-full max-w-xl rounded-3xl bg-forest p-7 text-left text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sun">One more thing</p>
        <h2 className="title-3 mt-2">Would you make it monthly?</h2>
        <p className="mt-2 text-white/85">Monthly gifts let us promise a senior their meals or a student their tuition for the whole year. You can stop anytime.</p>
        <Link href="/donate?frequency=monthly" className="btn mt-5 bg-sun text-ink hover:bg-[#e9a420]">Give monthly instead</Link>
      </div>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/impact" className="btn-ghost">See our impact</Link>
        <Link href="/volunteer" className="btn-ghost">Volunteer with us</Link>
      </div>
      <p className="mt-10 text-sm text-ink-soft">Questions about your gift? Email <a className="font-semibold text-forest underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </section>
  );
}
