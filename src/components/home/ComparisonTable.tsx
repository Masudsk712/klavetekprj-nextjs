"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import { comparisonData } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.06 },
 },
};

const rowVariants: Variants = {
 hidden: { opacity: 0, x: -16 },
 visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easePremium } },
};

export default function ComparisonTable() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={comparisonData.title} subtitle={comparisonData.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 gap-4"
 >
 {comparisonData.features.map((item, index) => (
 <motion.div key={item.feature} variants={rowVariants}>
 <GlassCard hover={false} className="p-5 md:p-6 group relative overflow-hidden hover-lift">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative flex items-center justify-between">
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{item.feature}</span>
 <div className="flex items-center gap-4">
 <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/15 flex items-center gap-1.5 dark:bg-primary/20 dark:border-primary/25">
 <Check className="w-3 h-3" /> {item.aac}
 </span>
 <span className="text-xs font-medium text-[var(--muted-text)] bg-[var(--surface-2)] px-2.5 py-1 rounded-full dark:bg-[var(--surface)] dark:text-[var(--muted-text)] dark:border dark:border-[var(--border)]">
 {item.clay}
 </span>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}