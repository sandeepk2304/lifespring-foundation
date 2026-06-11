import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our programs, want to partner with us, or just want to say hello.
        </p>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">Our Headquarters</h3>
                      <p className="text-slate-600 leading-relaxed text-base">123 Orchard Road, #05-12<br />Singapore 238881</p>
                    </div>
                  </div>

                  <div className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">Phone Number</h3>
                      <p className="text-slate-600 leading-relaxed text-base">+65 6123 4567<br />(Mon - Fri, 9am - 6pm)</p>
                    </div>
                  </div>

                  <div className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">Email Address</h3>
                      <p className="text-slate-600 leading-relaxed text-base">hello@lifespring.sg<br />support@lifespring.sg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-[320px] bg-slate-200 rounded-3xl overflow-hidden border border-slate-200 relative shadow-inner">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-multiply" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/95 px-6 py-3 rounded-xl shadow-lg font-bold text-slate-800 backdrop-blur-md flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                      View on Google Maps
                    </span>
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800">Your Name</label>
                  <Input placeholder="John Doe" className="bg-white h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800">Subject</label>
                  <Input placeholder="How can we help?" className="bg-white h-12 text-base" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-800">Message</label>
                  <Textarea placeholder="Type your message here..." className="bg-white min-h-[160px] text-base resize-none" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-md mt-4">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
