import type { Metadata } from "next";
import { FileText, ShieldCheck } from "lucide-react";
import { finances, governance, site } from "@/config/site";
import { FinanceBreakdown, PageHero, SectionHeading } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Governance & reports",
  description: `${site.name}'s registration, IPC status, board, annual reports, audited accounts and policies.`,
  alternates: { canonical: "/governance" },
};

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" });

export default function GovernancePage() {
  const facts = [
    { label: "Unique Entity Number (UEN)", value: site.uen },
    { label: "Charity registration no.", value: site.charityNumber },
    { label: "IPC status", value: site.ipcValidUntil ? `Valid until ${fmt(site.ipcValidUntil)}` : "Not an IPC" },
    { label: "Founded", value: String(site.founded) },
    { label: "Auditor", value: governance.auditor },
  ];
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title={<>Accountable to every <em className="text-sunrise">donor and family.</em></>}
        intro="Our registration, our board, our accounts and our policies, all in one place. If something you need isn't here, ask and we'll publish it."
      />

      <section className="container-x grid gap-14 py-20 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow="Registration" title="Who we are, on record" />
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                <dt className="text-ink-soft">{f.label}</dt>
                <dd className="font-semibold text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex gap-3 rounded-2xl bg-sage/70 p-5 text-forest">
            <ShieldCheck className="mt-0.5 size-5 shrink-0" />
            <span>
              {governance.codeOfGovernance}{" "}
              <a href={governance.charityPortalUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                View on the Charity Portal
              </a>
            </span>
          </p>
        </div>
        <div>
          <SectionHeading eyebrow="Board" title="Our board of directors" />
          <ul className="divide-y divide-line border-y border-line">
            {governance.board.map((m) => (
              <li key={m.name} className="flex items-baseline justify-between gap-6 py-4">
                <span>
                  <span className="block font-semibold text-ink">{m.name}</span>
                  <span className="text-sm text-ink-soft">{m.role}</span>
                </span>
                <span className="shrink-0 text-sm text-ink-soft">since {m.since}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">Board members serve without pay and declare conflicts of interest every year.</p>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow={`${finances.year} accounts`} title="Where the money goes" />
            <FinanceBreakdown />
          </div>
          <div>
            <SectionHeading eyebrow="Reports" title="Annual reports" />
            <ul className="space-y-3">
              {governance.reports.map((r) => (
                <li key={r.year} className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5">
                  <FileText className="size-6 shrink-0 text-sunrise" />
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{r.year}</span>
                    <span className="text-sm text-ink-soft">{r.title}</span>
                  </span>
                  {r.url ? (
                    <a href={r.url} className="btn-ghost min-h-10 px-4 text-sm">Download PDF</a>
                  ) : (
                    <a href={`mailto:${site.email}?subject=${encodeURIComponent(`${r.year} annual report`)}`} className="text-sm font-semibold text-forest underline underline-offset-2">Request a copy</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Policies" title="How we hold ourselves to account" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {governance.policies.map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 text-ink">
              <ShieldCheck className="size-5 shrink-0 text-forest" />{p}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink-soft">
          Copies of any policy are available on request: <a href={`mailto:${site.email}`} className="font-semibold text-forest underline underline-offset-2">{site.email}</a>.
        </p>
      </section>
    </>
  );
}
