export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Please read these terms carefully before using our services.
        </p>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl space-y-6 text-slate-600 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-4">
          <h2>1. Agreement to Terms</h2>
          <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.</p>
          
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on LifeSpring Foundation's website for personal, non-commercial transitory viewing only.</p>
          
          <h2>3. Disclaimer</h2>
          <p>The materials on LifeSpring Foundation's website are provided on an 'as is' basis. LifeSpring Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2>4. Limitations</h2>
          <p>In no event shall LifeSpring Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LifeSpring Foundation's website.</p>

          <h2>5. Revisions</h2>
          <p>The materials appearing on LifeSpring Foundation's website could include technical, typographical, or photographic errors. LifeSpring Foundation does not warrant that any of the materials on its website are accurate, complete, or current.</p>
        </div>
      </section>
    </div>
  );
}
