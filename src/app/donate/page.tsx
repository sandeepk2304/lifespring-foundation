import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { campaign, donations, faqs, finances, money, site } from "@/config/site";
import { DonationWidget } from "@/components/site/DonationWidget";
import { CampaignProgress, Faq, FinanceBreakdown, SunShape } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Donate",
  description: `Give once or monthly to ${site.name}. See exactly what your gift provides. Tax-deductible in Singapore.`,
  alternates: { canonical: "/donate" },
};

export default async function DonatePage({ searchParams }: PageProps<"/donate">) {
  const { amount, frequency } = await searchParams;
  const initial = Number(Array.isArray(amount) ? amount[0] : amount) || undefined;
  const initialFrequency = frequency === "once" ? "once" : "monthly";

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <SunShape className="pointer-events-none absolute -right-24 top-0 w-[30rem] opacity-50" />
        <div className="container-x relative grid gap-12 py-12 sm:py-20 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-20">
          <div>
            <p className="eyebrow">Donate</p>
            <h1 className="title-1 mt-4 text-ink">Your gift, <em className="text-sunrise">made visible.</em></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Choose an amount and see exactly what it provides. Giving monthly lets us plan programmes a year ahead, and you can change or stop anytime.
            </p>
            <ul className="mt-8 space-y-3 text-ink">
              {["Secure checkout, receipts by email", "Tax-deductible in Singapore", `${finances.split[0].percent}¢ of every dollar goes to ${finances.split[0].label.toLowerCase()}`].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" />{t}</li>
              ))}
            </ul>
            {campaign && (
              <div className="mt-10 max-w-md rounded-3xl border border-line bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunrise">Current appeal</p>
                <h2 className="mt-1 font-sans text-xl font-semibold text-ink">{campaign.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{campaign.blurb}</p>
                <div className="mt-5"><CampaignProgress /></div>
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <DonationWidget initialAmount={initial} initialFrequency={initialFrequency} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p className="rounded-2xl border border-line bg-surface p-4 text-sm text-ink-soft">
                <strong className="block text-ink">Card, Apple Pay, Google Pay</strong>
                Secure checkout. No account needed.
              </p>
              {donations.paynowUen && (
                <p className="rounded-2xl border border-line bg-surface p-4 text-sm text-ink-soft">
                  <strong className="block text-ink">Prefer PayNow?</strong>
                  Pay to UEN <span className="font-semibold text-ink">{donations.paynowUen}</span> and add your NRIC in the reference for a tax receipt.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-16 py-20 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow">Transparency</p>
          <h2 className="title-2 mt-3 text-ink">Where every dollar goes</h2>
          <p className="mt-4 mb-8 text-ink-soft">Our audited accounts are published every year. Minimum gift {money(donations.minimum)}.</p>
          <FinanceBreakdown />
        </div>
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="title-2 mt-3 mb-8 text-ink">Before you give</h2>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
