import Link from "next/link";
import { campaign, finances, money } from "@/config/site";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <SunShape className="pointer-events-none absolute -right-24 -top-10 w-[28rem] opacity-60 sm:-right-10" />
      <div className="container-x relative py-16 sm:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="title-1 mt-4 max-w-4xl text-ink">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, action }: { eyebrow: string; title: React.ReactNode; intro?: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="title-2 mt-3 text-ink">{title}</h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn-ghost shrink-0 self-start md:self-auto">{action.label} →</Link>
      )}
    </div>
  );
}

// Concentric half-rings: the "rising sun" motif.
export function SunShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true" fill="none">
      {[190, 150, 110, 70].map((r, i) => (
        <path key={r} d={`M${200 - r} 200a${r} ${r} 0 0 1 ${r * 2} 0`} stroke="var(--sun)" strokeOpacity={0.25 + i * 0.15} strokeWidth="2" />
      ))}
      <path d="M160 200a40 40 0 0 1 80 0Z" fill="var(--sun)" fillOpacity="0.55" />
    </svg>
  );
}

export function CampaignProgress({ dark = false }: { dark?: boolean }) {
  if (!campaign) return null;
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  // A date, not a countdown: pages are static, so a "days left" number would go stale.
  const ends = new Date(campaign.endsOn).toLocaleDateString("en-SG", { day: "numeric", month: "short" });
  const muted = dark ? "text-white/75" : "text-ink-soft";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`figure !text-[2.25rem] ${dark ? "text-white" : "text-ink"}`}>{money(campaign.raised)}</p>
        <p className={`text-sm ${muted}`}>of {money(campaign.goal)}</p>
      </div>
      <div
        role="progressbar"
        aria-label={`${campaign.title} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className={`mt-3 h-3 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-paper-2"}`}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-sun to-sunrise-bright" style={{ width: `${pct}%` }} />
      </div>
      <p className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm ${muted}`}>
        <span><strong className={dark ? "text-white" : "text-ink"}>{pct}%</strong> funded</span>
        <span><strong className={dark ? "text-white" : "text-ink"}>{campaign.donors.toLocaleString("en-SG")}</strong> donors</span>
        <span>ends <strong className={dark ? "text-white" : "text-ink"}>{ends}</strong></span>
      </p>
    </div>
  );
}

export function FinanceBreakdown({ dark = false }: { dark?: boolean }) {
  const shades = dark ? ["bg-sage", "bg-sun", "bg-sunrise-bright"] : ["bg-forest", "bg-sun", "bg-sunrise"];
  return (
    <div>
      <div className="flex h-5 overflow-hidden rounded-full" role="img" aria-label={finances.split.map((s) => `${s.label} ${s.percent}%`).join(", ")}>
        {finances.split.map((s, i) => <div key={s.label} className={shades[i % shades.length]} style={{ width: `${s.percent}%` }} />)}
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        {finances.split.map((s, i) => (
          <div key={s.label}>
            <dt className={`flex items-center gap-2 text-sm ${dark ? "text-white/75" : "text-ink-soft"}`}>
              <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${shades[i % shades.length]}`} />
              {s.label}
            </dt>
            <dd className={`figure mt-1 pl-5 !text-[2.25rem] ${dark ? "text-white" : "text-ink"}`}>{s.percent}%</dd>
          </div>
        ))}
      </dl>
      {finances.reportUrl && (
        <a href={finances.reportUrl} className="btn-ghost mt-6">Download the {finances.year} annual report</a>
      )}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-sunrise transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-forest py-4 text-sage" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-serif text-2xl italic">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">{t}<span className="text-sun not-italic">✺</span></span>
        ))}
      </div>
    </div>
  );
}
