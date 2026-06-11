export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We are committed to protecting your personal information and your right to privacy.
        </p>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl space-y-6 text-slate-600 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-4">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
          
          <h2>3. Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          
          <h2>4. How Long Do We Keep Your Information?</h2>
          <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>

          <h2>5. Contact Us</h2>
          <p>If you have questions or comments about this notice, you may email us at privacy@lifespring.sg.</p>
        </div>
      </section>
    </div>
  );
}
