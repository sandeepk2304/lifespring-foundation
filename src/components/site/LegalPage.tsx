import { PageHero } from "./blocks";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; body: string }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated ${updated}.`} />
      <article className="container-x max-w-3xl py-16">
        <p className="mb-10 rounded-2xl border border-sun/60 bg-sun/15 p-4 text-sm text-ink">
          Template text. Have it reviewed by a qualified adviser before launch.
        </p>
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="title-3 text-ink">{i + 1}. {s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
