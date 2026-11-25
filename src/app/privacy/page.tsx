import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="25 November 2026"
      sections={[
        { heading: "What we collect", body: "The details you give us in our forms (name, email, phone, message), your donation amount and frequency, and, if you choose, your NRIC or UEN for tax-deduction filing. Card details are handled by our payment provider and never reach our servers. Your name and NRIC or UEN for tax filing are encrypted before they are stored with the payment." },
        { heading: "How we use it", body: "To reply to you, process donations and receipts, file tax deductions with IRAS on your behalf, coordinate volunteering, and send our newsletter if you subscribed. We follow Singapore's Personal Data Protection Act (PDPA)." },
        { heading: "Who we share it with", body: "Only service providers that help us run the site and process donations (for example our email and payment providers), and authorities where the law requires. We never sell or rent your data." },
        { heading: "How long we keep it", body: "Donation records are kept as long as charity and tax law require. Enquiries are deleted after 24 months, and you can unsubscribe from emails at any time." },
        { heading: "Your rights", body: `You can ask to see, correct or delete your personal data, or withdraw consent, by emailing ${site.email}. Our Data Protection Officer will reply within 30 days.` },
      ]}
    />
  );
}
