import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartHandshake, Users, GraduationCap, Stethoscope, ChevronRight, Quote } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Green Theme Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-32 pb-20 lg:pt-32 overflow-hidden bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5]">
        {/* Abstract Green Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-300/20 blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-300/20 blur-[120px]" />
           <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-green-200/20 blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-sm text-sm font-semibold text-emerald-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Singapore's Charity of Choice 2026
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-emerald-950 leading-[1.1] tracking-tight">
                Empowering the <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Vulnerable
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-emerald-900/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We are dedicated to bringing hope and tangible support to families and individuals in need. Join us in our mission to create a compassionate and inclusive community for all.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/about" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-8 text-lg font-medium rounded-full shadow-lg shadow-emerald-600/20 transition-transform hover:scale-105">
                  Learn More
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center border-2 border-emerald-200 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 h-14 px-8 text-lg font-medium rounded-full transition-transform hover:scale-105 gap-2">
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-emerald-800/80 text-sm font-medium">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-emerald-50 bg-emerald-100 bg-[url('https://i.pravatar.cc/100?img=${i}')] bg-cover z-[${5-i}]`} />
                  ))}
                </div>
                <p>Join <strong className="text-emerald-950">850+</strong> active volunteers</p>
              </div>
            </div>

            {/* Right Image/Graphic */}
            <div className="w-full lg:w-1/2 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 fill-mode-both">
               <div className="relative w-full aspect-square md:aspect-[4/3] max-w-[600px] mx-auto lg:ml-auto">
                 {/* Decorative element behind */}
                 <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-teal-100/50 rounded-[2.5rem] -z-10" />
                 
                 {/* Main Image */}
                 <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-white">
                   <img src="/hero.png" alt="Community Volunteering" className="w-full h-full object-cover" />
                 </div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-emerald-50 flex items-center gap-4 animate-bounce hover:animate-none">
                   <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                     <HeartHandshake className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-emerald-950">2,500+ Families</p>
                     <p className="text-xs text-emerald-700/70">Supported this year</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <img src="/about.png" alt="Volunteers helping elderly" className="w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Compassion in Action
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a simple belief that everyone deserves a fair chance, LifeSpring Foundation has been at the forefront of social impact in Singapore. We believe in holistic support that goes beyond immediate relief.
              </p>
              <ul className="space-y-3">
                {['Compassion and Empathy', 'Integrity & Transparency', 'Community Resilience'].map((val, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <ChevronRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{val}</span>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="text-primary font-semibold px-0 hover:no-underline group">
                <Link href="/about" className="flex items-center gap-2">
                  Read Our Full Story
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Statistics */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact By The Numbers</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Through the generous support of our donors and volunteers, we've made significant strides in uplifting communities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Families Supported", value: "2,500+" },
              { label: "Community Programs", value: "48" },
              { label: "Active Volunteers", value: "850+" },
              { label: "Funds Raised (SGD)", value: "$5.2M" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-sm">{stat.value}</div>
                <div className="text-sm md:text-base font-semibold text-emerald-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Core Programs</h2>
              <p className="text-slate-600 text-lg">
                We take a multi-faceted approach to community support, addressing education, healthcare, and sustainable development.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 border-slate-300">
              <Link href="/programs">View All Programs</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Education Support", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-100", desc: "Scholarships and mentoring for underprivileged students." },
              { title: "Community Development", icon: Users, color: "text-emerald-500", bg: "bg-emerald-100", desc: "Building resilient neighborhoods through skill workshops." },
              { title: "Healthcare Assistance", icon: Stethoscope, color: "text-orange-500", bg: "bg-orange-100", desc: "Subsidized medical care and mental health counseling." },
              { title: "Youth Empowerment", icon: HeartHandshake, color: "text-purple-500", bg: "bg-purple-100", desc: "Leadership training and career guidance for at-risk youth." },
            ].map((prog, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 rounded-xl ${prog.bg} flex items-center justify-center mb-6`}>
                  <prog.icon className={`h-6 w-6 ${prog.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{prog.title}</h3>
                <p className="text-slate-600 mb-4">{prog.desc}</p>
                <Link href={`/programs#${prog.title.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Voices of Impact</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Hear from the individuals whose lives have been touched by our community.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "LifeSpring Foundation gave my children the educational support they needed when times were incredibly tough. We are forever grateful for the kindness.",
                name: "Sarah Lee",
                role: "Beneficiary Parent",
                avatar: "https://i.pravatar.cc/150?img=47"
              },
              {
                text: "Volunteering here has been the most rewarding experience of my life. Seeing the direct impact we make on the elderly community is truly inspiring.",
                name: "David Chen",
                role: "Lead Volunteer",
                avatar: "https://i.pravatar.cc/150?img=11"
              },
              {
                text: "The vocational training program completely turned my life around. I now have a stable job and can support my family with dignity.",
                name: "Ahmad Ibrahim",
                role: "Program Graduate",
                avatar: "https://i.pravatar.cc/150?img=33"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 md:p-10 relative border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="absolute top-8 right-8 h-10 w-10 text-slate-200" />
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 bg-slate-200 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed">
            Whether you want to volunteer your time, make a donation, or partner with us, your contribution helps build a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-accent text-slate-900 hover:bg-accent/90 text-base h-14 px-8 font-bold">
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white text-base h-14 px-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
