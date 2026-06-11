"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Impact", href: "/impact" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "top-4" : "top-0"
      }`}
    >
      <div className={`container mx-auto transition-all duration-300 px-4 md:px-6`}>
        <div className={`w-full flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-lg border border-slate-200/50 px-6 py-4 rounded-2xl md:rounded-full" 
            : "bg-transparent py-6"
        }`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-emerald-950 leading-tight">LifeSpring</span>
              <span className="text-sm font-medium text-emerald-700/80 leading-none">Foundation</span>
            </div>
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/donate" className="px-6 py-2.5 rounded-full border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors">
            Donate Now
          </Link>
          <Link href="/volunteer" className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-colors">
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-700 hover:text-primary p-2 rounded-md hover:bg-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
            <Link href="/donate" className={buttonVariants({ variant: "outline", className: "w-full justify-center border-primary text-primary" })}>
              Donate Now
            </Link>
            <Link href="/volunteer" className={buttonVariants({ className: "w-full justify-center bg-primary text-white" })}>
              Get Involved
            </Link>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
