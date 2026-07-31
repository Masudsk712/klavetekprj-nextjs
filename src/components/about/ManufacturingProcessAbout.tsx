"use client";

import { motion, type Variants } from "framer-motion";
import { manufacturingProcessAbout } from "@/data/about";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.08, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function ManufacturingProcessAbout() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={manufacturingProcessAbout.title} subtitle={manufacturingProcessAbout.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
 >
 {manufacturingProcessAbout.steps.map((step, index) => (
 <motion.div key={step.step} variants={itemVariants}>
 <GlassCard className="p-6 md:p-8 group relative overflow-hidden h-full">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
 {step.step}
 </div>
 <h3 className="text-base font-semibold text-[var(--heading)]">{step.title}</h3>
 </div>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed">{step.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}
