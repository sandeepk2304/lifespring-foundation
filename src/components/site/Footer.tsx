import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, programs, site } from "@/config/site";
import { Logo } from "./Logo";
import { EnquiryForm } from "./EnquiryForm";

const socialLabels: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

export function Footer() {
  return (
    <footer className="bg-forest-2 pb-28 text-white/80 sm:pb-0">
      <div className="container-x grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="title-2 max-w-md text-white">
            One email a month. <em className="text-sun">Real stories</em>, no spam.
          </h2>
          <p className="mt-4 max-w-md">Programme updates, volunteer calls and where the money went, straight from the field.</p>
        </div>
        <div className="self-end">
          <EnquiryForm kind="newsletter" dark />
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">{site.description}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {Object.entries(site.social).filter(([, url]) => url).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-1.5 hover:border-white hover:text-white">
                {socialLabels[key] ?? key}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-sun">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
            <li><Link href="/governance" className="hover:text-white">Governance &amp; reports</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-sun">Programmes</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((p) => <li key={p.slug}><Link href={`/programs#${p.slug}`} className="hover:text-white">{p.title}</Link></li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-sun">Visit or call</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-sun" /><span>{site.address.street}<br />{site.address.city} {site.address.postalCode}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-sun" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-sun" /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · UEN {site.uen} · Charity no. {site.charityNumber}
          {site.ipcValidUntil && <> · IPC status valid until {new Date(site.ipcValidUntil).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</>}
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href="/governance" className="hover:text-white">Governance</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <a href={site.credit.url} className="hover:text-white">Site by {site.credit.name}</a>
        </div>
      </div>
    </footer>
  );
}
