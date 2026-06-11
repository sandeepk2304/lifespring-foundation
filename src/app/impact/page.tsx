import { Target, Users, CheckCircle, Home, Quote } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
         <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Our Impact</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transparency is key to our mission. See exactly how your support is bringing measurable change to lives across Singapore.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white border-y border-primary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold">12,450</div>
                <div className="text-sm font-medium text-emerald-100 uppercase tracking-wider">People Assisted</div>
             </div>
             <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold">185</div>
                <div className="text-sm font-medium text-emerald-100 uppercase tracking-wider">Projects Completed</div>
             </div>
             <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold">850+</div>
                <div className="text-sm font-medium text-emerald-100 uppercase tracking-wider">Volunteers Engaged</div>
             </div>
             <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Home className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold">15</div>
                <div className="text-sm font-medium text-emerald-100 uppercase tracking-wider">Communities Reached</div>
             </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stories of Change</h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto">Beyond the numbers, our impact is best measured by the personal transformations of those we serve.</p>
          </div>
          
          <div className="space-y-12">
            {[
              {
                name: "The Lim Family",
                story: "After Mr. Lim lost his job during the economic downturn, his family of four struggled to make ends meet. The stress was overwhelming, and they were at risk of losing their housing. Our Community Outreach team stepped in with emergency food rations, utility subsidies, and intensive financial counseling.",
                outcome: "Today, Mr. Lim is gainfully employed after attending our vocational retraining program. The family has stabilized their finances, and his two children are flourishing in school with the help of our educational subsidies. They now volunteer with us to help others.",
                img: "bg-slate-200"
              },
              {
                name: "Ahmad's Journey",
                story: "Ahmad was at risk of dropping out of secondary school due to a lack of supervision, peer pressure, and financial difficulties at home. He felt disconnected and lacked confidence. He reluctantly joined our Youth Empowerment leadership camp two years ago.",
                outcome: "The mentorship Ahmad received transformed his outlook. He discovered a passion for leadership, scored well in his N-Levels, and is now pursuing a diploma at a local polytechnic. Ahmad currently serves as a peer mentor in the same program that helped him.",
                img: "bg-slate-200"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                <div className={`w-full md:w-5/12 aspect-[4/3] md:aspect-auto ${story.img} relative flex items-center justify-center`}>
                   <Quote className="w-20 h-20 text-slate-300 opacity-50" />
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 space-y-8">
                  <h3 className="text-3xl font-bold text-slate-900">{story.name}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-4 h-[2px] bg-slate-300 rounded-full" /> The Challenge
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-lg">{story.story}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                         <span className="w-4 h-[2px] bg-emerald-500 rounded-full" /> The Outcome
                      </h4>
                      <p className="text-slate-800 leading-relaxed font-medium text-lg bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">{story.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
