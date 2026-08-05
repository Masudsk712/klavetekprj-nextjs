"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Check,
  Download,
  ArrowRight,
  Box,
  Ruler,
  Weight,
  Sparkles,
} from "lucide-react";
import { products } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { easePremium, viewportOnce } from "@/lib/animations";

// ─── Animation Variants ───────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

const headingReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easePremium },
  },
};

// ─── Simple Fade Animation ───────────────────────────────
const simpleFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easePremium } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

// ─── Spec Row Animation ───────────────────────────────────
const specRowVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.5, ease: easePremium },
  }),
};

// ─── Pill Selector Variants ───────────────────────────────
const pillVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  active: { scale: 1 },
};

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const activeProduct = products.items[activeIndex];
  const cardRef = useRef<HTMLDivElement>(null);

  // Simple hover state
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % products.items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleProductSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section className="relative py-28 md:py-36 lg:py-40 overflow-hidden">
      {/* ─── Background Effects ─────────────────────────── */}
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Green radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.12] via-transparent to-transparent pointer-events-none" />

      {/* Soft spotlight behind product */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl opacity-60 pointer-events-none" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── Main Content ──────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div variants={headingReveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Product Range
            </span>
          </motion.div>

          <motion.h2
            variants={headingReveal}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--heading)] dark:text-white mb-6 leading-tight"
          >
            Choose the Perfect AAC Block
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
              for Every Construction Need
            </span>
          </motion.h2>

          <motion.p
            variants={headingReveal}
            className="text-lg md:text-xl text-[var(--body-text)] dark:text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed"
          >
            Precision-engineered AAC blocks available in multiple sizes to deliver
            superior strength, thermal efficiency, and sustainable construction
            performance.
          </motion.p>
        </motion.div>

        {/* ─── Premium Glass Card ──────────────────────── */}
        <motion.div
          ref={cardRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Soft ambient glow */}
          <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 via-accent-glow/10 to-primary/20 rounded-full blur-3xl -z-10 opacity-60" />

          {/* Glass card container */}
          <motion.div
            animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: easePremium }}
            className="relative rounded-[32px] bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden"
          >
            {/* Premium lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/15 dark:via-transparent rounded-[32px] pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
              {/* LEFT: 3D Product Display (55%) */}
              <motion.div variants={itemVariants} className="lg:col-span-7 p-8 md:p-12 lg:p-16">
                <div className="relative aspect-square flex items-center justify-center">
                  {/* Floating shadow beneath product */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-primary/30 to-transparent blur-3xl opacity-60" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProduct.size}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: easePremium }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      {/* Product image with simple hover */}
                      <motion.div
                        animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                        transition={{ duration: 0.5, ease: easePremium }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={activeProduct.image}
                          alt={activeProduct.title}
                          fill
                          className="object-contain"
                          style={{ filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                          priority={activeIndex === 0}
                          loading={activeIndex === 0 ? "eager" : "lazy"}
                        />

                        {/* Soft shadow beneath */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-t from-primary/25 to-transparent blur-2xl opacity-50" />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* RIGHT: Product Information (45%) */}
              <motion.div variants={itemVariants} className="lg:col-span-5 p-8 md:p-12 lg:p-16 lg:border-l lg:border-white/10">
                <motion.div
                  key={activeProduct.size}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: easePremium }}
                >
                  {/* Product Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] dark:text-white mb-4 leading-tight">
                    {activeProduct.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] mb-8 leading-relaxed">
                    {activeProduct.description}
                  </p>

                  {/* Premium Specification Panel */}
                  <div className="mb-8 rounded-2xl border border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                        Technical Specifications
                      </h4>
                    </div>
                    <div>
                      {[
                        {
                          label: "Length",
                          value: activeProduct.specs.length,
                          icon: Ruler,
                        },
                        {
                          label: "Height",
                          value: activeProduct.specs.height,
                          icon: Ruler,
                        },
                        {
                          label: "Thickness",
                          value: activeProduct.specs.thickness,
                          icon: Box,
                        },
                        {
                          label: "Weight",
                          value: activeProduct.specs.weight,
                          icon: Weight,
                        },
                      ].map((spec, idx) => (
                        <motion.div
                          key={spec.label}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                          className="spec-row flex items-center justify-between px-6 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                              <spec.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-sm font-semibold text-[var(--body-text)] dark:text-[var(--muted-text)]">
                              {spec.label}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-[var(--heading)] dark:text-white tabular-nums">
                            {spec.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="mb-8">
                    <h4 className="text-base font-semibold text-[var(--heading)] dark:text-white mb-3">
                      Ideal Applications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProduct.applications.map((app, idx) => (
                        <motion.div
                          key={app}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 + idx * 0.04, duration: 0.4 }}
                          className="flex items-center gap-2.5 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          {app}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-wrap gap-3"
                  >
                    <motion.a
                      href="/products"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>

                    <motion.a
                      href="/documents/brochure.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-ghost inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Datasheet
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Premium Pill Selector ───────────────────── */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
        >
          <div className="relative inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--surface)]/60 dark:bg-[var(--surface)]/40 backdrop-blur-xl border border-[var(--border)]">
            {products.items.map((item, idx) => (
              <button
                key={item.size}
                onClick={() => handleProductSelect(idx)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 whitespace-nowrap ${
                  activeIndex === idx
                    ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-md"
                    : "text-[var(--body-text)] dark:text-[var(--muted-text)] hover:text-[var(--heading)] dark:hover:text-white"
                }`}
              >
                {item.size}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}