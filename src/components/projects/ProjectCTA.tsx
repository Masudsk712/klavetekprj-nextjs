"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ProjectCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-primary/20" />
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(22,163,74,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-premium-lg">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Build Your <span className="gradient-text">Dream Project</span>?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Partner with Klavetek for premium AAC blocks, expert guidance, and unmatched quality. Let&apos;s build something extraordinary together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="tel:+917811824341" className="btn-ghost text-white border-white/30 hover:border-primary hover:text-primary text-base px-8 py-4">
              <MessageCircle className="w-5 h-5" /> Call Now
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
