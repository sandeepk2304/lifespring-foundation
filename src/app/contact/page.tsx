import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about programmes, partnerships, donations or volunteering.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    { icon: MapPin, label: "Visit", value: `${site.address.street}, ${site.address.city} ${site.address.postalCode}`, href: site.mapUrl },
    { icon: Phone, label: "Call", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...(site.whatsapp ? [{ icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${site.whatsapp}` }] : []),
    { icon: Clock, label: "Office hours", value: site.hours, href: "" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s <em className="text-sunrise">talk.</em></>}
        intro="Questions about a programme, a partnership idea or your donation receipt: we reply within two working days."
      />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <ul className="space-y-6">
          {details.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex gap-4">
              <span className="arch grid h-14 w-12 shrink-0 place-items-end justify-center bg-sage pb-2.5 text-forest"><Icon className="size-5" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{label}</p>
                {href ? (
                  <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-1 block text-lg font-semibold text-ink hover:text-forest">{value}</a>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="card p-6 sm:p-9">
          <h2 className="title-3 mb-6 text-ink">Send us a message</h2>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
