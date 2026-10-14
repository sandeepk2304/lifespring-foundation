"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import { site } from "@/config/site";

// Always-reachable actions on phones, hidden where they would duplicate the page's own CTA.
export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname === "/donate") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        {site.whatsapp && (
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost min-h-12 flex-none px-4"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="size-5" />
          </a>
        )}
        <Link href="/donate" className="btn-donate flex-1">
          <Heart className="size-4" fill="currentColor" /> Donate now
        </Link>
      </div>
    </div>
  );
}
