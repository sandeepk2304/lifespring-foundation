import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, team, values } from "@/config/site";
import { PageHero, SectionHeading } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "About us",
  description: `Founded in ${site.founded}, ${site.name} began with hot meals for seniors and now runs education, outreach, elderly care and youth programmes.`,
  alternates: { canonical: "/about" },
};

const initials = (name: string) => name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Neighbours first. <em className="text-sunrise">A charity second.</em></>}
        intro={`${site.name} started in ${site.founded} as a few volunteers cooking hot meals for seniors in mature estates. It has grown, but the idea hasn't changed: show up, listen, and stay.`}
      />

      <section className="container-x grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="arch relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-sage">
          <Image src="/about.png" alt="A volunteer and an elderly woman painting together" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
        </div>
        <div className="space-y-10">
          <div>
            <p className="eyebrow">Our story</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Over the past decade we have grown into a full charity, working on educational inequality, isolation among seniors and support for
              young people at risk, while staying rooted in one belief: every person deserves a fair chance to thrive.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-forest p-7 text-white">
              <h2 className="title-3">Our vision</h2>
              <p className="mt-3 leading-relaxed text-white/85">A compassionate, inclusive {site.country} where everyone, whatever their background, can reach their potential and live with dignity.</p>
            </div>
            <div className="rounded-3xl bg-sun p-7 text-ink">
              <h2 className="title-3">Our mission</h2>
              <p className="mt-3 leading-relaxed">To empower vulnerable families and individuals through education, healthcare and community programmes that build lasting resilience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What guides us" title="Our values" />
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="bg-surface p-7">
                <dt className="title-3 font-serif font-semibold text-ink">
                  <span className="block text-2xl text-sunrise">0{i + 1}</span>
                  <span className="mt-4 block">{v.title}</span>
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading eyebrow="Leadership" title="The people accountable to you" intro="Our board and staff report to donors and beneficiaries every year." />
        <ul className="grid gap-5 sm:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="card p-6">
              <span className="arch grid h-24 w-20 place-items-center bg-sage font-serif text-3xl font-semibold text-forest" aria-hidden="true">{initials(m.name)}</span>
              <h3 className="mt-5 font-sans text-xl font-semibold text-ink">{m.name}</h3>
              <p className="text-sunrise">{m.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/volunteer" className="btn-forest">Join as a volunteer</Link>
          <Link href="/impact" className="btn-ghost">Read our impact report</Link>
        </div>
      </section>
    </>
  );
}
