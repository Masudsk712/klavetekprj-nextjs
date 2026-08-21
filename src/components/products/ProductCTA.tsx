"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { easePremium, viewportOnce } from "@/lib/animations";

/**
 * FINAL CTA — single, compact closing call to action.
 */
export default function ProductCTA() {
  const prefersReducedMotion = useReducedMotion();

  const itemHidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 };
  const itemVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-primary" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 py-20 md:py-28 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          <motion.h2
            variants={{ hidden: itemHidden, visible: itemVisible }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Build Better With Klavetek
          </motion.h2>
          <motion.p
            variants={{ hidden: itemHidden, visible: itemVisible }}
            className="mt-5 text-base text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            Get a tailored quote or speak with our technical team for expert
            guidance on selecting the right AAC block for your project.
          </motion.p>
          <motion.div
            variants={{ hidden: itemHidden, visible: itemVisible }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-primary"
              aria-label="Get a quote for Klavetek AAC blocks"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              <span>Get a Quote</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-transparent text-white font-semibold px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="Talk to a Klavetek AAC block expert"
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
              <span>Talk to an Expert</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}