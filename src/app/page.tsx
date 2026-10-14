import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, HandHeart, Handshake, Users } from "lucide-react";
import { campaign, need, partners, programs, site, stats, testimonials } from "@/config/site";
import { DonationWidget } from "@/components/site/DonationWidget";
import { CampaignProgress, FinanceBreakdown, Marquee, SectionHeading, SunShape } from "@/components/site/blocks";

const waysToHelp = [
  { icon: HandHeart, title: "Give monthly", body: "A regular gift lets us plan a whole year of meals, tuition and visits.", href: "/donate", cta: "Become a monthly donor" },
  { icon: Users, title: "Volunteer", body: "Two hours a week as a befriender, tutor or mentor changes someone's week.", href: "/volunteer", cta: "See open roles" },
  { icon: Handshake, title: "Partner with us", body: "Team volunteering days, matched giving and sponsored programmes for companies.", href: "/contact", cta: "Talk to our team" },
];

export default function Home() {
  const [featured, ...moreQuotes] = testimonials;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <SunShape className="pointer-events-none absolute -left-40 bottom-0 w-[36rem] opacity-40" />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div>
            <p className="eyebrow">{site.country} · since {site.founded}</p>
            <h1 className="display mt-5 text-ink">
              Every family deserves a{" "}
              <em className="relative whitespace-nowrap text-sunrise">
                spring
                <svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
                  <path d="M3 14c50-10 140-12 194-4" stroke="var(--sun)" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </em>{" "}
              after winter.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              We stand beside families, seniors and young people in {site.country} through hard seasons, with meals, mentoring,
              scholarships and care that lasts until things get better.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/donate" className="btn-donate">Give today <ArrowRight className="size-4" /></Link>
              <Link href="/programs" className="btn-ghost">See what we do</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sage">
              <Image
                src="/hero.png"
                alt="Volunteers handing out food packs to residents at a community event"
                fill
                preload
                quality={60}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 28rem, 40vw"
                className="object-cover"
              />
            </div>
            {campaign && (
              <div className="card absolute -bottom-8 left-4 right-4 p-5 shadow-[0_20px_50px_-20px_rgb(23_37_29/0.45)] sm:-left-10 sm:right-auto sm:w-80">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunrise">Live appeal</p>
                <p className="mt-1 font-semibold text-ink">{campaign.title}</p>
                <div className="mt-3"><CampaignProgress /></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mt-10 lg:mt-0">
        <Marquee items={["Hot meals for seniors", "Scholarships", "Weekly befriending", "Health screenings", "Youth mentoring", "Crisis relief"]} />
      </div>

      {/* The need */}
      <section className="container-x pt-20 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">Why we exist</p>
            <h2 className="title-2 mt-3 text-ink">{need.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{need.body}</p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {need.points.map((p) => (
              <div key={p.label} className="flex items-baseline gap-4 border-b border-line pb-4">
                <dt className="sr-only">{p.label}</dt>
                <dd className="figure !text-[2.25rem] shrink-0 text-sunrise">{p.value}</dd>
                <dd className="text-ink-soft">{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Numbers */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">This year, together</p>
            <h2 className="title-2 mt-3 text-ink">Small acts, <em className="text-forest">counted honestly.</em></h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We publish our numbers and our accounts every year, so you always know what your support makes possible.
            </p>
            <Link href="/impact" className="mt-6 inline-flex items-center gap-2 font-semibold text-forest underline decoration-sun decoration-2 underline-offset-4">
              Read our impact report <ArrowRight className="size-4" />
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:gap-x-10">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-sun pl-5">
                <dt className="text-sm leading-snug text-ink-soft">{s.label}</dt>
                <dd className="figure mt-2 text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Programmes */}
      <section className="border-t border-line bg-surface py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title={<>Four programmes, <em className="text-sunrise">one community.</em></>}
            intro="Each one is designed with the people it serves, and each one is measured."
            action={{ href: "/programs", label: "All programmes" }}
          />
          <ol className="border-t border-ink/15">
            {programs.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/programs#${p.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-ink/15 py-7 transition hover:bg-paper sm:gap-x-10 sm:px-4 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)_2rem]"
                >
                  <span className="col-start-1 row-start-1 font-serif text-2xl font-medium text-sunrise sm:text-3xl">0{i + 1}</span>
                  <h3 className="title-3 col-start-2 row-start-1 text-ink transition group-hover:text-forest">{p.title}</h3>
                  <p className="col-span-3 col-start-1 row-start-2 text-ink-soft md:col-span-1 md:col-start-3 md:row-start-1">
                    {p.short} <span className="whitespace-nowrap font-semibold text-forest">{p.reach}.</span>
                  </p>
                  <ArrowUpRight className="col-start-3 row-start-1 size-7 justify-self-end text-ink-soft transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sunrise md:col-start-4" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Give */}
      <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-28">
        <SunShape className="pointer-events-none absolute -right-32 -top-6 w-[40rem] opacity-30" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow !text-sun">See what your gift does</p>
            <h2 className="title-2 mt-3">Pick an amount. <em className="text-sun">Watch it become something.</em></h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
              Every amount below is costed from our own programmes. Monthly gifts go furthest, because they let us plan a year ahead.
            </p>
            <div className="mt-10 rounded-3xl border border-white/15 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sun">Where every dollar goes</p>
              <div className="mt-5">
                <FinanceBreakdown dark />
              </div>
            </div>
          </div>
          <DonationWidget />
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="arch relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-sage">
            <Image
              src="/about.png"
              alt="A volunteer painting with an elderly woman at a senior activity centre"
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <figure>
            <p className="eyebrow">In their words</p>
            <blockquote className="mt-5 font-serif text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.015em] text-ink">
              <span className="text-sunrise">“</span>{featured.quote}<span className="text-sunrise">”</span>
            </blockquote>
            <figcaption className="mt-6 text-ink-soft">
              <strong className="text-ink">{featured.name}</strong> · {featured.role}
            </figcaption>
            <div className="mt-10 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
              {moreQuotes.map((t) => (
                <figure key={t.name}>
                  <blockquote className="leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm text-ink-soft"><strong className="text-ink">{t.name}</strong> · {t.role}</figcaption>
                </figure>
              ))}
            </div>
          </figure>
        </div>
      </section>

      {/* Partners */}
      <section className="container-x pb-20 sm:pb-24" aria-labelledby="partners-heading">
        <p id="partners-heading" className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">Supported by</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <li key={p} className="font-serif text-xl font-semibold tracking-[-0.01em] text-ink-soft">{p}</li>
          ))}
        </ul>
      </section>

      {/* Ways to help */}
      <section className="border-t border-line bg-paper-2 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Get involved" title={<>Three ways to <em className="text-sunrise">stand beside us.</em></>} />
          <div className="grid gap-5 md:grid-cols-3">
            {waysToHelp.map(({ icon: Icon, ...w }) => (
              <Link key={w.title} href={w.href} className="card group flex flex-col p-7 transition hover:-translate-y-1 hover:border-forest">
                <span className="arch grid h-16 w-14 place-items-end justify-center bg-sage pb-3 text-forest"><Icon className="size-6" /></span>
                <h3 className="title-3 mt-6 text-ink">{w.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{w.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest group-hover:text-sunrise">
                  {w.cta} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
