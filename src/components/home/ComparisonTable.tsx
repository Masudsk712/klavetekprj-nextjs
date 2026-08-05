"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";
import { comparisonData } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.06 },
 },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.7, ease: easePremium } 
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: easePremium } 
  },
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 60 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 1, ease: easePremium } 
  },
};

const imageFloatVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: easePremium,
      delay: 0.3
    } 
  },
};

const vsBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      duration: 0.8, 
      ease: easePremium,
      delay: 0.5
    } 
  },
};

export default function ComparisonTable() {
  return (
  <section className="relative py-16 md:py-24 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

  {/* Decorative glows */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none dark:bg-primary/12" />

  <div className="mx-auto max-w-7xl px-6 lg:px-10">
  <SectionHeader title={comparisonData.title} subtitle={comparisonData.subtitle} />

  {/* Image Comparison Section */}
  <motion.div
  variants={imageRevealVariants}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
  className="mb-12 md:mb-16"
  >
  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-10">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
  
  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
  {/* AAC Blocks Image */}
  <motion.div
  variants={imageFloatVariants}
  className="relative group"
  >
  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 to-emerald-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  <div className="relative rounded-2xl overflow-hidden border-4 border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/30">
  <img
  src="/images/comaparison/AacBlocks.png"
  alt="AAC Blocks"
  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
  <div className="flex items-center gap-3">
  <motion.div 
  className="w-3 h-3 bg-emerald-400 rounded-full"
  animate={{ 
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1]
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  />
  <span className="text-white font-bold text-base md:text-lg uppercase tracking-wide">Premium AAC Blocks</span>
  </div>
  </div>
  </div>
  </motion.div>

  {/* VS Badge */}
  <motion.div
  variants={vsBadgeVariants}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
  >
  <div className="relative">
  <motion.div 
  className="absolute inset-0 bg-emerald-500/40 rounded-full blur-3xl"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  />
  <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-orange-500 text-white font-black text-2xl md:text-3xl px-8 py-4 rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm">
  VS
  </div>
  </div>
  </motion.div>

  {/* Mobile VS Badge */}
  <motion.div
  variants={vsBadgeVariants}
  className="flex justify-center md:hidden -my-4 relative z-10"
  >
  <div className="relative">
  <motion.div 
  className="absolute inset-0 bg-emerald-500/40 rounded-full blur-2xl"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  />
  <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-orange-500 text-white font-black text-xl px-6 py-3 rounded-full shadow-xl border-4 border-white/30">
  VS
  </div>
  </div>
  </motion.div>

  {/* Clay Bricks Image */}
  <motion.div
  variants={imageFloatVariants}
  className="relative group"
  >
  <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-orange-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  <div className="relative rounded-2xl overflow-hidden border-4 border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 shadow-2xl hover:shadow-orange-500/30">
  <img
  src="/images/comaparison/ClayBricks.png"
  alt="Clay Bricks"
  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
  <div className="flex items-center gap-3">
  <div className="w-3 h-3 bg-orange-400 rounded-full" />
  <span className="text-white font-bold text-base md:text-lg uppercase tracking-wide">Traditional Clay Bricks</span>
  </div>
  </div>
  </div>
  </motion.div>
  </div>
  </div>
  </motion.div>

  {/* Main Comparison Container */}
  <motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
  className="relative"
  >
  <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)] bg-white dark:bg-[var(--surface)]">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

  {/* Header Row */}
  <motion.div variants={headerVariants} className="relative">
  <div className="grid grid-cols-12 gap-0">
  {/* Empty corner */}
  <div className="col-span-12 md:col-span-3 bg-gray-200 dark:bg-gray-700 p-4 md:p-6">
  <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide">Category</span>
  </div>
  
  {/* AAC Blocks Header */}
  <div className="col-span-6 md:col-span-4 bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 md:p-6 relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/images/textures/noise.png')] opacity-10 mix-blend-overlay" />
  <div className="relative text-center">
  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">AAC Blocks</h3>
  </div>
  </div>

  {/* Clay Bricks Header */}
  <div className="col-span-6 md:col-span-5 bg-gradient-to-r from-orange-500 to-orange-600 p-4 md:p-6 relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/images/textures/noise.png')] opacity-10 mix-blend-overlay" />
  <div className="relative text-center">
  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">Clay Bricks</h3>
  </div>
  </div>
  </div>
  </motion.div>

  {/* Comparison Rows */}
  {comparisonData.features.map((item, index) => (
  <motion.div 
  key={item.feature} 
  variants={rowVariants}
  className={`relative ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800/30'}`}
  >
  <div className="grid grid-cols-12 gap-0 items-stretch">
  {/* Category Name */}
  <div className="col-span-12 md:col-span-3 p-4 md:p-6 flex items-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
  <span className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">{item.feature}</span>
  </div>

  {/* AAC Blocks Content */}
  <div className="col-span-6 md:col-span-4 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 bg-emerald-50/30 dark:bg-emerald-900/10 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors duration-300">
  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.aac}</p>
  </div>

  {/* Clay Bricks Content */}
  <div className="col-span-6 md:col-span-5 p-4 md:p-6 bg-orange-50/30 dark:bg-orange-900/10 hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-colors duration-300">
  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.clay}</p>
  </div>
  </div>
  
  {/* Subtle divider line */}
  <div className="hidden md:block absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
  </motion.div>
  ))}
  </div>
  </motion.div>

  </div>
  </section>
  );
}
