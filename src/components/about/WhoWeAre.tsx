"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { whoWeAre } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const leftContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easePremium },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const wordReveal: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: easePremium } },
};

export default function WhoWeAre() {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Very subtle scroll-linked parallax drift for the visual.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [22, -22]);

  // Build the headline word-by-word so only "manufacturer" is highlighted.
  const headingWords = whoWeAre.statement.split(" ").map((word) => {
    const isHighlight = word.startsWith("manufacturer");
    return {
      text: isHighlight ? "manufacturer" : word,
      isHighlight,
    };
  });

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-20 md:py-24">
      {/* very subtle theme-aware green ambiance + faint noise + radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.035] to-transparent dark:via-primary/[0.05]" />
      <div className="noise-bg pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-radial from-primary/[0.08] to-transparent blur-[120px]" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── LEFT: editorial content ── */}
          <motion.div
            variants={leftContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-6"
          >
            {/* Eyebrow — thin green accent line on either side */}
            <motion.span
              variants={itemReveal}
              className="inline-flex items-center gap-3"
            >
              <span className="h-px w-9 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
                {whoWeAre.label}
              </span>
              <span className="h-px w-9 bg-gradient-to-l from-primary to-transparent" />
            </motion.span>

            {/* Headline — staggered word reveal, green highlight on "manufacturer" */}
            <motion.h2
              variants={headingContainer}
              className="mt-7 text-[clamp(2.1rem,4.6vw,3.4rem)] font-bold leading-[1.08] tracking-tight"
            >
              {headingWords.map((word, i) => (
                <span
                  key={i}
                  className="-mb-[0.12em] inline-block overflow-hidden align-top pb-[0.12em]"
                >
                  <motion.span
                    variants={wordReveal}
                    className={
                      word.isHighlight
                        ? "inline-block text-primary"
                        : "inline-block"
                    }
                  >
                    {word.text}
                    {word.isHighlight ? (
                      <span className="text-[var(--heading)] dark:text-white">
                        .
                      </span>
                    ) : null}
                  </motion.span>
                  {"\u00A0"}
                </span>
              ))}
            </motion.h2>

            {/* Paragraphs — fade upward sequentially */}
            {whoWeAre.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={itemReveal}
                className={`max-w-xl text-base leading-[1.85] text-[var(--muted-text)] dark:text-[var(--muted-text)] ${
                  i === 0 ? "mt-8" : "mt-5"
                }`}
              >
                {para}
              </motion.p>
            ))}

            {/* Belief statement */}
            <motion.blockquote
              variants={itemReveal}
              className="mt-5 max-w-xl border-l-2 border-primary pl-5 text-lg font-medium leading-relaxed text-[var(--heading)] dark:text-white"
            >
              {whoWeAre.belief}
            </motion.blockquote>

            {/* Facts row */}
            <motion.div
              variants={itemReveal}
              className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--border)] pt-7 sm:grid-cols-4"
            >
              {whoWeAre.facts.map((fact) => (
                <div key={fact.label}>
                  <div className="text-xl font-bold text-primary">
                    {fact.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--muted-text)]">
                    {fact.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA — appears last */}
            <motion.div variants={itemReveal} className="mt-9">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-hover px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(var(--primary-rgb),0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(var(--primary-rgb),0.5)]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10">Explore Our Products</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-colors duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: premium cinematic visual ── */}
          <div ref={frameRef} className="relative lg:col-span-6">
            {/* breathing green ambient glow behind the visual */}
            <motion.div
              className="pointer-events-none absolute -inset-12 rounded-[80px] bg-gradient-radial from-primary/22 via-primary/[0.06] to-transparent blur-[100px] dark:from-primary/26"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* entry: subtle fade + upward + small scale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 26 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.95, ease: easePremium }}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(160deg,#0d1a12_0%,#0a1410_55%,#050a07_100%)] shadow-[0_40px_90px_rgba(0,0,0,0.45)] dark:border-white/10">
                {/* green stage light + faint noise texture */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_110%,rgba(34,197,94,0.30),transparent_62%)]" />
                <div className="noise-bg pointer-events-none absolute inset-0 opacity-[0.05]" />

                {/* parallax + gentle float + hover zoom on the art-directed elephant */}
                <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                  <motion.div
                    className="relative h-full w-full"
                    style={prefersReducedMotion ? undefined : { y: imageY }}
                    initial={{ scale: 1.08 }}
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.15 }
                    }
                    transition={{ duration: 0.9, ease: easePremium }}
                  >
                    <motion.div
                      className="relative h-full w-full"
                      animate={
                        prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }
                      }
                      transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <Image
                        src={whoWeAre.image}
                        alt={whoWeAre.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={90}
                        draggable={false}
                        className="object-contain"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* glass sheen on the top edge */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
              </div>
            </motion.div>

            {/* floating metadata badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.7, ease: easePremium }}
              className="absolute -bottom-6 left-6 z-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M3 21V8l9-5 9 5v13" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-semibold text-[var(--heading)] dark:text-white">
                    {whoWeAre.badge}
                  </div>
                  <div className="text-xs text-[var(--muted-text)]">
                    {whoWeAre.badgeSub}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
