"use client";

import { motion, type Variants } from "framer-motion";
import { companyStory } from "@/data/about";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.12, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function CompanyStory() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center"
 >
 <motion.div variants={itemVariants}>
 <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-4">
 <span className="h-2.5 w-2.5 rounded-full bg-primary" />
 Our Journey
 </span>
 <SectionHeader title={companyStory.title} subtitle={companyStory.subtitle} />
 <div className="mt-8 space-y-5">
 {companyStory.paragraphs.map((para, i) => (
 <p key={i} className="text-[var(--body-text)] leading-relaxed">{para}</p>
 ))}
 </div>
 </motion.div>

 <motion.div variants={itemVariants}>
 <div className="grid grid-cols-2 gap-4">
 {companyStory.stats.map((stat, index) => (
 <motion.div
 key={stat.label}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 transition={{ delay: index * 0.08 }}
 className="relative p-6 rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-primary/[0.04] text-center shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] group overflow-hidden"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <div className="text-3xl md:text-4xl font-bold text-primary">
 <AnimatedCounter value={stat.value} duration={2.4} />
 </div>
 <div className="text-sm text-[var(--muted-text)] mt-1">{stat.label}</div>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </motion.div>
 </div>
 </section>
 );
}
