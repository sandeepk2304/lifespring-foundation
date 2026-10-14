import { site } from "@/config/site";

export function DemoBar() {
  if (!site.demo) return null;
  return (
    <div className="bg-ink px-4 py-2 text-center text-xs text-white/80">
      Concept website: {site.shortName} is a fictional charity. Designed &amp; built by{" "}
      <a href={site.credit.url} className="font-semibold text-sun underline-offset-2 hover:underline">{site.credit.name}</a>
      {" "}as a template for non-profits.
    </div>
  );
}
