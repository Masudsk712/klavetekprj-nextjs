"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqData } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easePremium,
      },
    },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: easePremium },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: easePremium },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
  <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
  {/* Animated background elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />
  <motion.div
  className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15"
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  />
  <motion.div
  className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none dark:bg-primary/10"
  animate={{
    scale: [1, 1.3, 1],
    opacity: [0.2, 0.4, 0.2],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  />

  <div className="mx-auto max-w-4xl px-6 lg:px-10">
  <motion.div
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={viewportOnce}
  transition={{ duration: 0.6, ease: easePremium }}
  >
  <SectionHeader title={faqData.title} subtitle={faqData.subtitle} />
  </motion.div>

  <motion.div
  className="space-y-4"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
  >
  {faqData.items.map((item, index) => (
  <motion.div
  key={index}
  variants={itemVariants}
  whileHover={{ y: -2 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
  <GlassCard
  hover={false}
  className={`group relative px-5 md:px-8 transition-all duration-500 ${
  openIndex === index
  ? "bg-primary/[0.04] dark:bg-primary/[0.08] border-primary/30 shadow-lg shadow-primary/5"
  : "bg-[var(--surface)]/50 dark:bg-[var(--surface)]/70 hover:bg-[var(--surface)]/80 dark:hover:bg-[var(--surface)]"
  }`}
  >
  {/* Question number badge */}
  <motion.div
  className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-xs font-bold shadow-lg"
  whileHover={{ scale: 1.2, rotate: 360 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
  {index + 1}
  </motion.div>

  <button
  onClick={() => setOpenIndex(openIndex === index ? null : index)}
  className="w-full flex items-center justify-between py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
  >
  <div className="flex items-start gap-4 flex-1">
  <div className="flex-shrink-0 mt-0.5">
  <HelpCircle
  className={`w-5 h-5 transition-colors duration-300 ${
  openIndex === index
  ? "text-primary"
  : "text-[var(--muted-text)] group-hover:text-primary"
  }`}
  />
  </div>
  <span className="text-sm md:text-base font-semibold text-[var(--heading)] dark:text-white pr-4 leading-relaxed">
  {item.question}
  </span>
  </div>
  <motion.div
  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
  openIndex === index
  ? "bg-primary text-white rotate-180"
  : "bg-primary/10 text-primary dark:bg-primary/20 group-hover:bg-primary/20"
  }`}
  whileTap={{ scale: 0.9 }}
  >
  {openIndex === index ? (
  <Minus className="w-5 h-5" />
  ) : (
  <Plus className="w-5 h-5" />
  )}
  </motion.div>
  </button>

  <AnimatePresence>
  {openIndex === index && (
  <motion.div
  variants={expandVariants}
  initial="collapsed"
  animate="expanded"
  exit="exit"
  className="overflow-hidden"
  >
  <motion.div
  className="pb-6 md:pb-8 pl-9"
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.3 }}
  >
  <div className="w-full h-px bg-gradient-to-r from-primary/30 to-transparent mb-4" />
  <p className="text-sm md:text-base text-[var(--body-text)] leading-relaxed dark:text-[var(--muted-text)]">
  {item.answer}
  </p>
  </motion.div>
  </motion.div>
  )}
  </AnimatePresence>
  </GlassCard>
  </motion.div>
  ))}
  </motion.div>

  {/* Bottom decorative element */}
  <motion.div
  className="mt-16 flex justify-center"
  initial={{ opacity: 0, scale: 0 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={viewportOnce}
  transition={{ duration: 0.6, delay: 0.8 }}
  >
  <div className="relative">
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
  <HelpCircle className="w-8 h-8 text-primary" />
  </div>
  <motion.div
  className="absolute inset-0 rounded-full bg-primary/20"
  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  />
  </div>
  </motion.div>
  </div>
  </section>
  );
}
