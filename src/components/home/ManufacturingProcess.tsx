"use client";

import { motion, type Variants } from "framer-motion";
import { manufacturingProcess } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.1 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function ManufacturingProcess() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
 <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none dark:bg-accent-glow/10" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
 <SectionHeader title={manufacturingProcess.title} subtitle={manufacturingProcess.subtitle} />

 <div className="relative">
 {/* Desktop vertical line */}
 <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent hidden md:block" />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="space-y-8 md:space-y-12"
 >
 {manufacturingProcess.steps.map((step, index) => (
 <motion.div
 key={step.step}
 variants={itemVariants}
 className={`relative flex flex-col md:flex-row items-start gap-6 ${
 index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
 }`}
 >
 {/* Step Number */}
 <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-hover text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30 z-10 hover-lift">
 {step.step}
 </div>

 {/* Content */}
 <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)]`}>
 <motion.div
 whileHover={{ y: -4, transition: { duration: 0.25 } }}
 className="rounded-3xl border border-primary/15 bg-[var(--surface)]/80 backdrop-blur-xl p-6 shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] hover:shadow-[0_24px_70px_rgba(0, 0, 0,0.12)] transition-all duration-300 dark:bg-[var(--surface)]/80 dark:border-primary/25 dark:shadow-none dark:hover:shadow-white/5"
 >
 <div className="flex items-center gap-3 mb-3">
 <div className="h-px w-6 bg-gradient-to-r from-primary/60 to-transparent" />
 <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
 Step {step.step}
 </span>
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] dark:text-white mb-2">{step.title}</h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed dark:text-[var(--muted-text)]">{step.description}</p>
 </motion.div>
 </div>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </div>
 </section>
 );
}