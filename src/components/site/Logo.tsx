import Link from "next/link";
import { site } from "@/config/site";

// A sun rising over a sprout: "spring" in two shapes.
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--forest)" />
      <path d="M8 27a12 12 0 0 1 24 0Z" fill="var(--sun)" />
      <path d="M20 31V20" stroke="var(--paper)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 24c0-3.5 2.6-5.8 6-5.8 0 3.4-2.6 5.8-6 5.8Z" fill="var(--paper)" />
      <path d="M20 26.5c0-3-2.2-5-5-5 0 2.9 2.2 5 5 5Z" fill="var(--paper)" />
      <path d="M7 31h26" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <LogoMark />
      <span className={`font-serif text-2xl font-semibold tracking-[-0.02em] leading-none ${light ? "text-white" : "text-ink"}`}>
        {site.shortName}
        <span className={`ml-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${light ? "text-sage" : "text-ink-soft"}`}>
          Foundation
        </span>
      </span>
    </Link>
  );
}
