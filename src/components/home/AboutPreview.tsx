"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Leaf, Truck } from "lucide-react";
import { aboutPreview } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.12, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 24 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const iconMap: Record<string, React.ReactNode> = {
 "ISI Certified": <Shield className="w-6 h-6 text-primary" />,
 "Eco-Friendly": <Leaf className="w-6 h-6 text-primary" />,
 "Pan-India Supply": <Truck className="w-6 h-6 text-primary" />,
};

export default function AboutPreview() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden noise-bg">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary-hover/[0.03] pointer-events-none" />

 {/* Decorative green glow */}
 <div className="absolute top-40 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center"
 >
 {/* Left Content */}
 <motion.div variants={itemVariants}>
 <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-4">
 <span className="h-2.5 w-2.5 rounded-full bg-primary" />
 About Klavetek
 </span>
 <SectionHeader title={aboutPreview.title} subtitle={aboutPreview.subtitle} />
 <div className="mt-8 space-y-5">
 {aboutPreview.features.map((feature, index) => (
 <motion.div
 key={feature.title}
 variants={itemVariants}
 className="flex items-start gap-4 group hover-lift"
 >
 <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/15 flex items-center justify-center">
 {iconMap[feature.title]}
 </div>
 <div>
 <h4 className="font-semibold text-[var(--heading)]">{feature.title}</h4>
 <p className="text-sm text-[var(--muted-text)] mt-1 leading-relaxed">{feature.description}</p>
 </div>
 </motion.div>
 ))}
 </div>
 <motion.div variants={itemVariants}>
 <Link
 href={aboutPreview.ctaLink}
 className="btn-primary mt-10 inline-flex"
 >
 <span>{aboutPreview.cta}</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 </motion.div>
 </motion.div>

 {/* Right Visual */}
 <motion.div variants={itemVariants} className="relative">
 <motion.div
 whileHover={{ scale: 1.02 }}
 className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary-hover/5 border border-primary/15 shadow-[0_24px_70px_rgba(var(--primary-rgb),0.10)]"
 >
 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/50 to-transparent">
 <div className="text-center p-8">
 <div className="w-24 h-24 mx-auto rounded-3xl bg-[var(--surface)] border border-primary/15 shadow-sm flex items-center justify-center mb-5">
 <Shield className="w-11 h-11 text-primary" />
 </div>
 <h3 className="text-3xl font-bold text-[var(--heading)] tracking-tight">
 <AnimatedCounter value="15+" duration={2.2} />
 </h3>
 <p className="text-[var(--muted-text)] mt-2 text-base">Years of Manufacturing Excellence</p>
 </div>
 </div>
 </motion.div>

 {/* Floating stat cards */}
 <GlassCard elevated className="absolute -bottom-5 -left-5 md:-bottom-8 md:-left-8 p-5 md:p-6 hover-lift">
 <div className="text-3xl font-bold text-primary">
 <AnimatedCounter value="50M+" duration={2.4} />
 </div>
 <div className="text-sm text-[var(--muted-text)] mt-1">Blocks Produced</div>
 </GlassCard>

 <GlassCard elevated className="absolute -top-5 -right-5 md:-top-8 md:-right-8 p-5 md:p-6 hover-lift">
 <div className="text-3xl font-bold text-primary">
 <AnimatedCounter value="2010" duration={2} />
 </div>
 <div className="text-sm text-[var(--muted-text)] mt-1">Established</div>
 </GlassCard>
 </motion.div>
 </motion.div>
 </div>
 </section>
 );
}
