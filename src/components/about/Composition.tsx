"use client";

import { motion, type Variants } from "framer-motion";
import { compositionData } from "@/data/about";
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
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function Composition() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={compositionData.title} subtitle={compositionData.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
 >
 {compositionData.materials.map((material, index) => (
 <motion.div key={material.name} variants={itemVariants}>
 <GlassCard className="p-6 md:p-8 group relative overflow-hidden h-full">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="flex items-center justify-between mb-3">
 <h3 className="font-semibold text-[var(--heading)]">{material.name}</h3>
 <span className="text-sm font-bold text-primary">{material.percentage}</span>
 </div>
 <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
 <motion.div
 initial={{ width: 0 }}
 whileInView={{ width: material.percentage }}
 viewport={viewportOnce}
 transition={{ duration: 1.2, delay: index * 0.08 }}
 className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover"
 />
 </div>
 <p className="text-xs text-[var(--muted-text)] mt-3 leading-relaxed">{material.role}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}
