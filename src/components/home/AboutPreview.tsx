"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Award, Calendar, Factory } from "lucide-react";
import { aboutPreview } from "@/data/home";
import { easePremium, viewportOnce } from "@/lib/animations";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
};

const floatVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easePremium },
  },
};

export default function AboutPreview() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-[var(--background)] overflow-hidden">
      {/* Premium noise texture background */}
      <div className="noise-bg absolute inset-0 pointer-events-none opacity-[0.03]" />

      {/* Theme-aware green radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/12 via-primary/5 to-transparent rounded-full blur-[100px] pointer-events-none dark:from-primary/15" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 xl:px-10 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8 max-w-xl">
            {/* Premium Badge with glass effect */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-[var(--border)] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.6)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--heading)]">
                {aboutPreview.badge}
              </span>
            </div>

            {/* Large Heading with premium typography */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-[var(--heading)]">
              {aboutPreview.title}
            </h2>

            {/* Short Description with optimal reading width */}
            <p className="text-base md:text-lg text-[var(--body-text)] leading-relaxed opacity-90">
              {aboutPreview.description}
            </p>

            {/* Core Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aboutPreview.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 mt-0.5">
                    <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[var(--body-text)] leading-snug">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Brand Values - Premium glass badges */}
            <motion.div variants={itemVariants} className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--muted-text)]">
                Our Core Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutPreview.values.map((value, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full glass border border-[var(--border)] text-xs font-semibold text-[var(--heading)] hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-default backdrop-blur-md"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-3">
              <Link
                href={aboutPreview.ctaLink}
                className="btn-primary inline-flex group"
              >
                <span>{aboutPreview.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visual - Premium Image with Floating Cards */}
          <motion.div variants={floatVariants} className="relative">
            {/* Main Image Container - Premium styling */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border border-[var(--border)] shadow-[var(--shadow-premium)]"
            >
              {/* Subtle green glow behind image */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-[80px] -z-10 dark:from-primary/20" />

              {/* Premium Image with Next.js optimization */}
              <Image
                src={aboutPreview.image}
                alt="Klavetek Manufacturing Facility - Premium AAC Block Production"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={90}
              />

              {/* Adaptive overlay based on theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent dark:from-black/50 dark:via-black/10" />
            </motion.div>

            {/* Floating Glass Cards */}
            <div className="absolute -left-4 md:-left-8 top-8 md:top-12 animate-float">
              <div className="glass-card rounded-2xl p-4 md:p-5 shadow-[var(--shadow-lg)] border border-[var(--border)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold text-[var(--heading)] leading-tight">Since 2010</p>
                    <p className="text-[10px] md:text-xs text-[var(--muted-text)] uppercase tracking-wider">Our Journey Began</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 md:-right-6 bottom-16 md:bottom-24 animate-float" style={{ animationDelay: "1s" }}>
              <div className="glass-card rounded-2xl p-4 md:p-5 shadow-[var(--shadow-lg)] border border-[var(--border)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold text-[var(--heading)] leading-tight">15+ Years</p>
                    <p className="text-[10px] md:text-xs text-[var(--muted-text)] uppercase tracking-wider">Of Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 md:-left-6 bottom-4 md:bottom-8 animate-float" style={{ animationDelay: "2s" }}>
              <div className="glass-card rounded-2xl p-4 md:p-5 shadow-[var(--shadow-lg)] border border-[var(--border)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Factory className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold text-[var(--heading)] leading-tight">Premium AAC</p>
                    <p className="text-[10px] md:text-xs text-[var(--muted-text)] uppercase tracking-wider">Manufacturer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}