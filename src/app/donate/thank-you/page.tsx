import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { SunShape } from "@/components/site/blocks";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default async function ThankYouPage({ searchParams }: PageProps<"/donate/thank-you">) {
  const { frequency } = await searchParams;
  const alreadyMonthly = frequency === "monthly";
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <SunShape className="w-72" />
      <h1 className="title-1 mt-6 text-ink">Thank you. <em className="text-sunrise">Truly.</em></h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
        Your gift is on its way to families and seniors who need it. A receipt is in your inbox, and we&apos;ll write in a few months to show you what it made possible.
      </p>
      {!alreadyMonthly && (
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
