"use client";

import { motion, type Variants } from "framer-motion";
import { Building2, Monitor, Factory, GraduationCap } from "lucide-react";
import { applications } from "@/data/home";
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
 Residential: <Building2 className="w-7 h-7 text-primary" />,
 Commercial: <Monitor className="w-7 h-7 text-primary" />,
 Industrial: <Factory className="w-7 h-7 text-primary" />,
 Institutional: <GraduationCap className="w-7 h-7 text-primary" />,
};

export default function Applications() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={applications.title} subtitle={applications.subtitle} />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
 >
 {applications.categories.map((category, index) => (
 <motion.div key={category.title} variants={itemVariants}>
 <GlassCard className="group relative overflow-hidden hover-lift">
 <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary-hover/5 flex items-center justify-center overflow-hidden dark:from-primary/15 dark:to-primary-hover/10">
 <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-white/10" />
 <div className="relative text-primary group-hover:scale-110 transition-transform duration-500">
 {iconMap[category.title]}
 </div>
 </div>
 <div className="p-5">
 <h3 className="text-lg font-semibold text-[var(--heading)] group-hover:text-primary transition-colors dark:text-white">{category.title}</h3>
 <p className="text-sm text-[var(--muted-text)] mt-1 leading-relaxed dark:text-[var(--muted-text)]">{category.description}</p>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}