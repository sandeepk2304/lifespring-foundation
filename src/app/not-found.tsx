import Link from "next/link";
import { SunShape } from "@/components/site/blocks";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <SunShape className="w-64" />
      <h1 className="title-1 mt-6 text-ink">This page has moved on.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-soft">The link may be old, or the page may have been renamed.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-forest">Back to home</Link>
        <Link href="/programs" className="btn-ghost">See our programmes</Link>
      </div>
    </section>
  );
}
