"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  // The menu remembers which page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(item.href) ? "bg-sage text-forest" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/donate" className="btn-donate hidden min-h-11 px-5 sm:inline-flex">
            <Heart className="size-4" fill="currentColor" /> Donate
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface lg:hidden"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-x flex h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto py-6">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) && item.href !== "/" ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 font-serif text-3xl font-semibold tracking-[-0.02em] text-ink"
                >
                  {item.label} <span aria-hidden="true" className="text-xl text-sunrise">→</span>
                </Link>
              </li>
            ))}
            <li className="mt-6">
              <Link href="/donate" onClick={close} className="btn-donate w-full">
                <Heart className="size-4" fill="currentColor" /> Donate now
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
