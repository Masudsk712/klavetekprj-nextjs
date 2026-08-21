"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ctaData } from "@/data/home";
import SectionDivider from "@/components/shared/SectionDivider";
import { easePremium, viewportOnce } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.1, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function CTA() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--background)] dark:bg-[var(--background)] overflow-hidden transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-hover/10 pointer-events-none" />

 {/* Decorative orbs */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/12 rounded-full blur-[120px] pointer-events-none dark:bg-primary/15" />
 <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
 <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none dark:bg-accent-glow/10" />

 <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
 <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportOnce}>
 <motion.div variants={itemVariants}>
 <SectionDivider variant="dots" className="mb-10" />
 </motion.div>

 <motion.h2
 variants={itemVariants}
 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] tracking-tight"
 >
 {ctaData.title}
 </motion.h2>
 <motion.p
 variants={itemVariants}
 className="mt-5 text-base md:text-lg text-[var(--body-text)] max-w-2xl mx-auto leading-relaxed dark:text-[var(--muted-text)]"
 >
 {ctaData.subtitle}
 </motion.p>
 <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href={ctaData.primaryLink}
 className="btn-primary"
 >
 <span>{ctaData.primaryCta}</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 <a
 href={ctaData.secondaryLink}
 download="Klavetek-AAC-Blocks-Brochure.pdf"
 aria-label="Download Klavetek brochure"
 className="btn-ghost border-[var(--border)] text-[var(--heading)] dark:text-white hover:border-[var(--border)] hover:bg-[var(--surface-2)]/5"
 >
 <Download className="w-4 h-4" />
 <span>{ctaData.secondaryCta}</span>
 </a>
 </motion.div>
 </motion.div>
 </div>
 </section>
 );
}