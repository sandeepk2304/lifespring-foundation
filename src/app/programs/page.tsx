import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { programs, site } from "@/config/site";
import { PageHero } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Programmes",
  description: `Education, community outreach, elderly care and youth empowerment: how ${site.name} supports people across ${site.country}.`,
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={<>Help that fits <em className="text-sunrise">the season someone is in.</em></>}
        intro="Four programmes, designed with the people they serve and measured every year."
      >
        <nav aria-label="Programmes" className="mt-10 flex flex-wrap gap-2">
          {programs.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:border-forest">{p.title}</a>
          ))}
        </nav>
      </PageHero>

      <div className="container-x divide-y divide-line">
        {programs.map((p, i) => (
          <section key={p.slug} id={p.slug} className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <span className="font-serif text-3xl font-medium text-sunrise">0{i + 1}</span>
              <h2 className="title-2 mt-3 text-ink">{p.title}</h2>
              <p className="mt-5 inline-flex rounded-full bg-sage px-4 py-1.5 text-sm font-semibold text-forest">{p.reach}</p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink-soft">{p.description}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-ink">What we aim for</h3>
                  <ul className="mt-4 space-y-3">
                    {p.objectives.map((o) => (
                      <li key={o} className="flex gap-3 text-ink"><Check className="mt-0.5 size-5 shrink-0 text-forest" />{o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-ink">Who it serves</h3>
                  <p className="mt-4 text-ink">{p.beneficiaries}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/donate" className="btn-donate">Fund this programme</Link>
                <Link href="/volunteer" className="btn-ghost">Volunteer here</Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
