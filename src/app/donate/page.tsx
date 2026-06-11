import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-slate-50 text-center px-4 border-b border-slate-100">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Make a Donation</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your generosity enables us to continue our vital work across Singapore. Every dollar counts towards building a more inclusive society.
        </p>
      </section>
      
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-xl">
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Select Donation Amount</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {['$50', '$100', '$250', '$500', '$1000', 'Other'].map((amount, i) => (
                <button 
                  key={i} 
                  className={`py-3 rounded-xl border font-semibold transition-all ${
                    amount === '$100' 
                      ? 'bg-primary text-white border-primary shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-800">Custom Amount (SGD)</label>
                <Input type="number" placeholder="100.00" defaultValue="100" className="bg-white h-12 text-base" />
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 text-lg font-bold shadow-md">
              Proceed to Payment
            </Button>
            
            <p className="text-center text-xs text-slate-500 mt-6">
              LifeSpring Foundation is a registered charity in Singapore. <br/>All donations above $50 are eligible for 250% tax deduction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
