"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, FileCheck, Building2 } from "lucide-react";
import { certifications } from "@/data/about";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.1, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const iconMap: Record<string, React.ReactNode> = {
 BadgeCheck: <BadgeCheck className="w-7 h-7 text-primary" />,
 FileCheck: <FileCheck className="w-7 h-7 text-primary" />,
 Building2: <Building2 className="w-7 h-7 text-primary" />,
};

export default function Certifications() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={certifications.title} subtitle={certifications.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-3 gap-6"
 >
 {certifications.items.map((item, index) => (
 <motion.div key={item.title} variants={itemVariants}>
 <GlassCard className="p-8 md:p-10 group relative overflow-hidden text-center">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center mb-5">
 {iconMap[item.icon]}
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-3">{item.title}</h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed">{item.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}
