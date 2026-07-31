"use client";

import { motion, type Variants } from "framer-motion";
import { technicalSpecs } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.07 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function TechnicalSpecs() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden noise-bg">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

 {/* Decorative green glow */}
 <div className="absolute top-20 right-20 w-72 h-72 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={technicalSpecs.title} subtitle={technicalSpecs.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
 >
 {technicalSpecs.specs.map((spec, index) => (
 <motion.div key={spec.parameter} variants={itemVariants}>
 <GlassCard delay={index * 0.05} className="p-5 md:p-6 group relative overflow-hidden hover-lift">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-2">
 {spec.parameter}
 </div>
 <div className="text-2xl font-bold text-[var(--heading)] mb-1">
 <AnimatedCounter value={spec.value} duration={2} />
 </div>
 <div className="text-xs text-[var(--muted-text)]">{spec.standard}</div>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}
