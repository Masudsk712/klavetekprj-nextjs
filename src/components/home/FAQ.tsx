"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqData } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

export default function FAQ() {
 const [openIndex, setOpenIndex] = useState<number | null>(0);

 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />

 <div className="mx-auto max-w-3xl px-6 lg:px-10">
 <SectionHeader title={faqData.title} subtitle={faqData.subtitle} />
 <div className="space-y-3">
 {faqData.items.map((item, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 transition={{ delay: index * 0.05 }}
 >
 <GlassCard hover={false} className={`px-5 md:px-6 transition-colors ${openIndex === index ? "bg-primary/[0.03]" : ""} dark:bg-[var(--surface)]/70`}>
 <button
 onClick={() => setOpenIndex(openIndex === index ? null : index)}
 className="w-full flex items-center justify-between py-5 text-left"
 >
 <span className="text-sm md:text-base font-semibold text-[var(--heading)] dark:text-white pr-4">
 {item.question}
 </span>
 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary dark:bg-primary/20">
 {openIndex === index ? (
 <Minus className="w-4 h-4" />
 ) : (
 <Plus className="w-4 h-4" />
 )}
 </div>
 </button>
 <AnimatePresence>
 {openIndex === index && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="overflow-hidden"
 >
 <div className="pb-5 md:pb-6">
 <p className="text-sm text-[var(--body-text)] leading-relaxed dark:text-[var(--muted-text)]">{item.answer}</p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </GlassCard>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}