import { GraduationCap, Users, HeartHandshake, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const programs = [
  {
    id: "education-support",
    title: "Educational Scholarships",
    icon: GraduationCap,
    desc: "We believe that education is the great equalizer. Our scholarship program provides financial assistance, tuition support, and mentorship to students from low-income families, ensuring they have the resources needed to succeed academically.",
    objectives: ["Reduce dropout rates", "Provide access to digital learning tools", "Offer career guidance and mentorship"],
    beneficiaries: "Students aged 7-18 from underprivileged backgrounds",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: "community-outreach",
    title: "Community Outreach",
    icon: Users,
    desc: "Building resilient neighborhoods is at the heart of what we do. We organize regular food distribution drives, neighborhood clean-ups, and community bonding events to foster a strong sense of belonging and mutual support.",
    objectives: ["Ensure food security for vulnerable households", "Foster community cohesion", "Provide immediate crisis relief"],
    beneficiaries: "Low-income families and vulnerable individuals",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    id: "elderly-assistance",
    title: "Elderly Assistance",
    icon: Stethoscope,
    desc: "As Singapore's population ages, we are committed to ensuring our seniors live with dignity. Our programs include befriending services, basic health screenings, and assistance with daily living activities for isolated seniors.",
    objectives: ["Reduce social isolation among the elderly", "Improve physical and mental well-being", "Assist with healthcare navigation"],
    beneficiaries: "Seniors aged 65 and above living alone",
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    id: "youth-development",
    title: "Youth Empowerment",
    icon: HeartHandshake,
    desc: "Our youth programs focus on equipping at-risk teenagers with life skills, leadership training, and vocational guidance to help them make positive life choices and transition smoothly into adulthood.",
    objectives: ["Develop leadership and soft skills", "Provide safe spaces for recreation", "Offer vocational and career planning"],
    beneficiaries: "At-risk youth aged 13-21",
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Programs & Initiatives</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover how we are making a tangible difference in the lives of Singaporeans through our targeted, sustainable programs.
        </p>
      </section>

      {/* Programs List */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl space-y-24">
          {programs.map((prog, i) => (
            <div key={prog.id} id={prog.id} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`w-full md:w-1/2 aspect-[4/3] rounded-3xl ${prog.bg} flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden group`}>
                 <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 <prog.icon className={`w-32 h-32 ${prog.color} opacity-30 transform group-hover:scale-110 transition-transform duration-500`} />
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl ${prog.bg}`}>
                      <prog.icon className={`w-6 h-6 ${prog.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">{prog.title}</h2>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">{prog.desc}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 text-lg">Key Objectives</h4>
                  <ul className="space-y-3">
                    {prog.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-900 block mb-1">Target Beneficiaries</span>
                  <span className="text-slate-600">{prog.beneficiaries}</span>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 text-base shadow-sm">
                  <Link href="/volunteer">Volunteer for this Program</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
