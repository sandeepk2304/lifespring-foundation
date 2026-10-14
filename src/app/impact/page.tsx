import type { Metadata } from "next";
import Link from "next/link";
import { finances, programs, site, stats, stories } from "@/config/site";
import { FinanceBreakdown, PageHero, SectionHeading } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Our impact",
  description: `What ${site.name} achieved this year, where the money went, and the people behind the numbers.`,
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title={<>The numbers, <em className="text-sunrise">and the people in them.</em></>}
        intro="Transparency is part of the work. Here is what your support achieved, and exactly where the money went."
      />

      <section className="container-x py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-sun pl-5">
              <dt className="text-sm text-ink-soft">{s.label}</dt>
              <dd className="figure mt-2 text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow={`${finances.year} accounts`} title="Where the money went" />
            <FinanceBreakdown />
          </div>
          <div>
            <SectionHeading eyebrow="By programme" title="Who we reached" />
            <ul className="divide-y divide-line border-y border-line">
              {programs.map((p) => (
                <li key={p.slug} className="flex items-baseline justify-between gap-6 py-4">
                  <Link href={`/programs#${p.slug}`} className="font-semibold text-ink hover:text-forest">{p.title}</Link>
                  <span className="text-right text-ink-soft">{p.reach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow="Stories of change" title={<>Beyond the <em className="text-sunrise">numbers.</em></>} />
        <div className="grid gap-6 lg:grid-cols-2">
          {stories.map((s) => (
            <article key={s.name} className="card p-7 sm:p-9">
              <h3 className="title-3 text-ink">{s.name}</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">Before</p>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.challenge}</p>
                </div>
                <div className="rounded-2xl bg-sage/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Today</p>
                  <p className="mt-2 leading-relaxed text-ink">{s.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">Names and details are shared with permission.</p>
        <Link href="/donate" className="btn-donate mt-10">Help write the next story</Link>
      </section>
    </>
  );
}
