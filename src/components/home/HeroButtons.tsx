"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">

      {/* Primary CTA - Premium Solid */}

      <Link
        href="/contact"
        className="group relative inline-flex items-center gap-2.5 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[var(--primary-dark)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
      >
        Get Quote

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Link>

      {/* Secondary CTA - Premium Glass Outline */}

      <Link
        href="/products"
        className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-white/70 hover:bg-white/[0.12] hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
      >
        Explore Products

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>

    </div>
  );
}