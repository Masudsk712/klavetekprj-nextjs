"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30, scale: 0.95 },
 visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: easePremium } },
};

const categories = [
 {
 label: "Factory",
 image: "/images/features/Lightweight.webp",
 gradient: "from-emerald-900/60 via-green-900/50 to-slate-900/60",
 icon: "🏭",
 },
 {
 label: "Machinery",
 image: "/images/features/Eco-Friendly.webp",
 gradient: "from-green-900/60 via-emerald-900/50 to-slate-900/60",
 icon: "⚙️",
 },
 {
 label: "Production",
 image: "/images/features/EnergySavingThermalInsulation.webp",
 gradient: "from-teal-900/60 via-green-900/50 to-slate-900/60",
 icon: "🏗️",
 },
 {
 label: "Projects",
 image: "/images/features/fire-resistant.webp",
 gradient: "from-green-900/60 via-emerald-900/50 to-slate-900/60",
 icon: "🏢",
 },
];

export default function GalleryPreview() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
 <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/10" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 className="text-center mb-12 md:mb-16"
 >
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] tracking-tight dark:text-white">
 A Glimpse Inside Klavetek
 </h2>
 <p className="mt-4 text-base md:text-lg text-[var(--body-text)] max-w-2xl mx-auto leading-relaxed dark:text-[var(--muted-text)]">
 Take a visual tour of our manufacturing facility, machinery, and the projects we've helped build.
 </p>
 </motion.div>

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
 >
 {categories.map((category, index) => (
 <motion.div
 key={category.label}
 variants={itemVariants}
 whileHover={{ y: -8, scale: 1.03 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 className="group relative aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden border border-primary/15 bg-[var(--surface)] shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] cursor-pointer hover:shadow-[0_32px_90px_rgba(16,185,129,0.15)] dark:bg-[var(--surface)] dark:border-primary/25 dark:hover:shadow-[0_32px_90px_rgba(16,185,129,0.25)]"
 >
{/* Background image with gradient overlay */}
 <div 
 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
 style={{ backgroundImage: `url(${category.image})` }}
 />
 <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-500 group-hover:opacity-80`} />
 
 {/* Animated overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 transition-opacity duration-500 group-hover:opacity-90" />
 
 <div className="absolute inset-0 flex flex-col items-start justify-end p-5 md:p-6 text-left relative z-10">
 {/* Small icon with glass morphism - positioned at bottom left */}
 <motion.div 
 className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-2"
 whileHover={{ rotate: 5, scale: 1.1 }}
 >
 <span className="text-xl md:text-2xl filter drop-shadow-md">{category.icon}</span>
 </motion.div>
 
 <span className="text-sm md:text-base font-bold text-white drop-shadow-md tracking-wide">{category.label}</span>
 </div>
 
 {/* Corner accent */}
 <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 </motion.div>
 ))}
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 transition={{ delay: 0.3 }}
 className="text-center mt-12 md:mt-16"
 >
 <Link
 href="/gallery"
 className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-full shadow-[0_12px_35px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_16px_45px_rgba(var(--primary-rgb),0.4)] hover:scale-105 transition-all duration-300"
 >
 <span>View Full Gallery</span>
 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
 </Link>
 </motion.div>
 </div>
 </section>
 );
 }
