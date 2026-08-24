"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
 return (
  <div className="flex flex-wrap items-center gap-4">

  {/* Primary CTA - Premium Solid */}

   <Link
   href="/contact"
   className="btn-primary"
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
   className="btn-ghost"
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