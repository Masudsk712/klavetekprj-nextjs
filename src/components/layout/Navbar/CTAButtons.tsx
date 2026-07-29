"use client";

import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

import { company } from "@/constants/company";

interface CTAButtonsProps {
  isScrolled: boolean;
}

export default function CTAButtons({ isScrolled }: CTAButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Call Button */}

      <Link
        href={`tel:${company.phone}`}
        aria-label="Call Klavetek"
        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 hover:-translate-y-1 ${
          isScrolled
            ? "border-gray-200 bg-white text-gray-900 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-lg"
            : "border-white/25 bg-white/10 text-white hover:bg-white/20 hover:shadow-black/20"
        }`}
      >
        <Phone size={18} />
      </Link>

      {/* WhatsApp Button */}

      <Link
        href={`https://wa.me/${company.phone.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary-dark)] hover:shadow-lg"
      >
        <MessageCircle size={18} />
      </Link>

      {/* Get Quote */}

      <Link
        href="/contact"
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary-dark)] hover:shadow-xl"
      >
        Get Quote

        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}