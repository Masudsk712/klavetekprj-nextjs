"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/shared/Container";
import { aboutCta } from "@/data/about";
import { viewportOnce, staggerContainer, staggerItem } from "@/lib/animations";

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.4"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden text-white"
      style={{ minHeight: "clamp(560px, 90vh, 820px)" }}
    >
      {/* ── Background image ── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${aboutCta.image}')`,
          scale: prefersReducedMotion ? 1 : bgScale,
        }}
      />
      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 160px rgba(0,0,0,0.7)" }}
      />
      {/* thin dust grain */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto max-w-2xl text-center"
          style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[44px] md:leading-tight"
          >
            {aboutCta.title}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-base leading-relaxed text-white/85 md:text-lg"
          >
            {aboutCta.subtitle}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Link
                href={aboutCta.primaryHref}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-hover px-8 py-4 text-base font-semibold text-white shadow-[0_14px_40px_rgba(22,163,74,0.45)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_22px_55px_rgba(22,163,74,0.55)]"
              >
                <span className="relative z-10">{aboutCta.primaryCta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Link
                href={aboutCta.secondaryHref}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-white/55 hover:bg-white/10 hover:shadow-[0_0_0_0px_rgba(255,255,255,0)]"
              >
                <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span>{aboutCta.secondaryCta}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* soft green edge glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-glow/10 blur-[110px]" />
    </section>
  );
}
