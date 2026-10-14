import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { DemoBar } from "@/components/site/DemoBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileDonateBar } from "@/components/site/MobileDonateBar";

// Editorial serif for headings (soft, optical sizes) + a clean humanist sans for reading and UI.
const serif = Fraunces({ variable: "--font-fraunces", axes: ["SOFT"], subsets: ["latin"] });
// Italic is only used for accent words, so it loads after the page instead of competing with the hero image.
const serifItalic = Fraunces({ variable: "--font-fraunces-italic", style: "italic", axes: ["SOFT"], subsets: ["latin"], preload: false });
const sans = DM_Sans({ variable: "--font-dmsans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.country}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_SG", images: ["/hero.png"] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f7f2e8" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${serifItalic.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <DemoBar />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileDonateBar />
      </body>
    </html>
  );
}
