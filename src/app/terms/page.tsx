import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="14 October 2026"
      sections={[
        { heading: "Using this site", body: `By using this website you agree to these terms and to applicable Singapore law. The content is provided by ${site.name} for general information.` },
        { heading: "Donations", body: "Donations are voluntary and generally non-refundable. If you made an error, contact us within 14 days and we will review it. Monthly gifts can be changed or cancelled at any time." },
        { heading: "Content and trademarks", body: `Text, images and logos belong to ${site.name} or are used with permission. You may share our content for non-commercial purposes with credit.` },
        { heading: "Accuracy and liability", body: "We work to keep information accurate and up to date but cannot guarantee it. We are not liable for losses arising from the use of this website, to the extent the law allows." },
      ]}
    />
  );
}
