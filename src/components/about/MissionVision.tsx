"use client";

import { motion, type Variants } from "framer-motion";
import { missionVision } from "@/data/about";
import { Target, Eye } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeader from "@/components/shared/SectionHeader";
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

export default function MissionVision() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title="Mission & Vision" subtitle="The guiding principles that drive every decision we make." />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-1 md:grid-cols-2 gap-8"
 >
 <motion.div variants={itemVariants}>
 <GlassCard className="p-8 md:p-10 group relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative flex items-start gap-5">
 <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center">
 <Target className="w-7 h-7 text-primary" />
 </div>
 <div>
 <h3 className="text-2xl font-bold text-[var(--heading)] tracking-tight">{missionVision.mission.title}</h3>
 <p className="text-[var(--body-text)] leading-relaxed mt-3">{missionVision.mission.description}</p>
 </div>
 </div>
 </GlassCard>
 </motion.div>

 <motion.div variants={itemVariants}>
 <GlassCard className="p-8 md:p-10 group relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative flex items-start gap-5">
 <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary/10 flex items-center justify-center">
 <Eye className="w-7 h-7 text-primary" />
 </div>
 <div>
 <h3 className="text-2xl font-bold text-[var(--heading)] tracking-tight">{missionVision.vision.title}</h3>
 <p className="text-[var(--body-text)] leading-relaxed mt-3">{missionVision.vision.description}</p>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 </motion.div>
 </div>
 </section>
 );
}
