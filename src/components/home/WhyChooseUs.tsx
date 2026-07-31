"use client";

import { motion, type Variants } from "framer-motion";
import { Shield, Leaf, Zap, Thermometer, Volume2, Flame } from "lucide-react";
import { whyChooseUs } from "@/data/home";
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

const iconMap: Record<string, React.ReactNode> = {
 Shield: <Shield className="w-6 h-6 text-primary" />,
 Leaf: <Leaf className="w-6 h-6 text-primary" />,
 Zap: <Zap className="w-6 h-6 text-primary" />,
 Thermometer: <Thermometer className="w-6 h-6 text-primary" />,
 Volume2: <Volume2 className="w-6 h-6 text-primary" />,
 Flame: <Flame className="w-6 h-6 text-primary" />,
};

export default function WhyChooseUs() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={whyChooseUs.title} subtitle={whyChooseUs.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
 >
 {whyChooseUs.reasons.map((reason, index) => (
 <motion.div key={reason.title} variants={itemVariants}>
 <GlassCard delay={index * 0.05} className="p-6 md:p-8 group relative overflow-hidden hover-lift">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/15 flex items-center justify-center mb-5 dark:from-primary/15 dark:to-primary-hover/15 dark:border-primary/25">
 {iconMap[reason.icon]}
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] dark:text-white mb-3">{reason.title}</h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed dark:text-[var(--muted-text)]">{reason.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}