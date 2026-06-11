import { Heart, ShieldCheck, Eye, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We are LifeSpring Foundation, a dedicated group of individuals working to uplift communities and bring lasting change to Singapore.
        </p>
      </section>

      {/* Story, Vision, Mission */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
            <p className="text-lg text-slate-600 leading-relaxed text-justify md:text-center">
              Founded in 2010 by a group of passionate community leaders, LifeSpring Foundation began as a small grassroots initiative providing hot meals to the elderly in mature estates. Over the past decade, we have grown into a comprehensive charitable organization, addressing complex social issues from educational inequality to youth empowerment, while remaining rooted in our core belief that every individual deserves a fair chance to thrive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-slate-700 leading-relaxed">
                A compassionate and inclusive Singapore where every individual, regardless of their background, has the opportunity to achieve their full potential and lead a dignified life.
              </p>
            </div>
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                To empower vulnerable families and individuals through targeted educational, healthcare, and community development programs, fostering resilience and sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emerald-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">These principles guide every decision we make and every program we run.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "Compassion", desc: "Approaching every situation with empathy and understanding." },
              { icon: ShieldCheck, title: "Integrity", desc: "Upholding the highest ethical standards in our work." },
              { icon: Eye, title: "Transparency", desc: "Being accountable and open about our resources and impact." },
              { icon: Users, title: "Community", desc: "Believing in the power of collective action and support." },
            ].map((value, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Leadership</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Guided by experienced professionals dedicated to social impact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Dr. Amanda Chen", role: "Executive Director", img: "bg-blue-100/50 text-blue-800" },
              { name: "Marcus Tan", role: "Head of Programs", img: "bg-emerald-100/50 text-emerald-800" },
              { name: "Sarah Ibrahim", role: "Community Lead", img: "bg-orange-100/50 text-orange-800" },
            ].map((leader, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 text-center pb-8 transition-transform hover:-translate-y-1">
                <div className={`aspect-square ${leader.img.split(' ')[0]} mb-6 flex items-center justify-center`}>
                    <Users className={`w-16 h-16 ${leader.img.split(' ')[1]} opacity-20`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-primary font-medium">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
