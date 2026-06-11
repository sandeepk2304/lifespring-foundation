import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock } from "lucide-react";

export default function VolunteerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Become a Volunteer</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your time and skills can change a life. Join our community of changemakers and experience the joy of giving back.
        </p>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Why Volunteer With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Make a Real Impact</h3>
              <p className="text-emerald-700/80 leading-relaxed">See the direct results of your efforts in the smiles and progress of our beneficiaries.</p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Build New Skills</h3>
              <p className="text-blue-700/80 leading-relaxed">Gain hands-on experience in leadership, event management, and community organizing.</p>
            </div>
            <div className="p-8 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Join a Community</h3>
              <p className="text-orange-700/80 leading-relaxed">Meet like-minded, passionate individuals who share your desire to do good in Singapore.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 bg-slate-50 px-4 border-y border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Current Opportunities</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find a role that fits your schedule and aligns with your passions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: "Youth Mentor", loc: "Multiple Locations", time: "2 hrs/week" },
              { role: "Food Distribution Assistant", loc: "Tampines Hub", time: "Weekends, 4 hrs" },
              { role: "Elderly Befriender", loc: "Toa Payoh", time: "Flexible" },
              { role: "Event Photographer", loc: "Various", time: "Ad-hoc" },
              { role: "Academic Tutor (Math/Science)", loc: "Online / Woodlands", time: "3 hrs/week" },
              { role: "Admin Volunteer", loc: "HQ (Orchard Road)", time: "Weekdays, Flexible" }
            ].map((opp, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                 <h3 className="text-xl font-bold text-slate-900 mb-5">{opp.role}</h3>
                 <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 text-sm text-slate-600">
                     <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                       <MapPin className="w-4 h-4 text-emerald-500" />
                     </div>
                     <span className="font-medium">{opp.loc}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-slate-600">
                     <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                       <Clock className="w-4 h-4 text-primary" />
                     </div>
                     <span className="font-medium">{opp.time}</span>
                   </div>
                 </div>
                 <Button variant="outline" className="w-full h-11 border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold">
                   Express Interest
                 </Button>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Volunteer Application Form</h2>
            <p className="text-slate-600">Register your interest and our volunteer coordinator will get in touch with you shortly.</p>
          </div>
          
          <form className="space-y-8 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-800">Full Name</label>
                <Input placeholder="John Doe" className="bg-white h-12 text-base" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-800">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="bg-white h-12 text-base" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-800">Phone Number</label>
                <Input type="tel" placeholder="+65 9123 4567" className="bg-white h-12 text-base" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-800">Area of Interest</label>
                <Select>
                  <SelectTrigger className="bg-white h-12 text-base">
                    <SelectValue placeholder="Select an area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youth">Youth Mentorship</SelectItem>
                    <SelectItem value="elderly">Elderly Care</SelectItem>
                    <SelectItem value="events">Event Support</SelectItem>
                    <SelectItem value="admin">Admin / IT Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-800">Message (Optional)</label>
              <Textarea placeholder="Tell us a bit about yourself and why you want to volunteer..." className="bg-white min-h-[160px] text-base resize-none" />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-md">
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
