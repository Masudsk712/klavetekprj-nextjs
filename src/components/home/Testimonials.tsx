"use client";

import { motion, type Variants } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/data/home";
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

export default function Testimonials() {
 const [active, setActive] = useState(0);
 const count = testimonials.items.length;

 const next = useCallback(() => setActive((prev) => (prev + 1) % count), [count]);
 const prev = useCallback(() => setActive((prev) => (prev - 1 + count) % count), [count]);

 useEffect(() => {
 const timer = setInterval(next, 5000);
 return () => clearInterval(timer);
 }, [next]);

 return (
 <section className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={testimonials.title} subtitle={testimonials.subtitle} />

 <div className="relative max-w-4xl mx-auto">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="relative"
 >
 {testimonials.items.map((item, index) => (
 <motion.div
 key={item.name}
 variants={itemVariants}
 animate={{ opacity: active === index ? 1 : 0, y: active === index ? 0 : 20, scale: active === index ? 1 : 0.98 }}
 transition={{ duration: 0.6, ease: easePremium }}
 className={`${active === index ? "relative z-10" : "absolute inset-0"}`}
 >
 <GlassCard hover={false} className="p-8 md:p-10 relative overflow-hidden hover-lift">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 <div className="relative">
 <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6 dark:text-primary/30" />
 <div className="flex gap-1 mb-5">
 {Array.from({ length: item.rating }).map((_, i) => (
 <Star key={i} className="w-4 h-4 fill-primary text-primary" />
 ))}
 </div>
 <p className="text-[var(--body-text)] leading-relaxed mb-6 text-base md:text-lg italic dark:text-[var(--muted-text)]">&ldquo;{item.content}&rdquo;</p>
 <div className="flex items-center gap-4">
 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm dark:bg-primary/20">
 {item.name.split(" ").map(n => n[0]).join("").slice(0,2)}
 </div>
 <div>
 <div className="font-semibold text-[var(--heading)] text-sm dark:text-white">{item.name}</div>
 <div className="text-xs text-[var(--muted-text)] dark:text-[var(--muted-text)]">{item.role}</div>
 </div>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>

 {/* Navigation */}
 <div className="flex items-center justify-center gap-3 mt-8">
 <button
 onClick={prev}
 aria-label="Previous testimonial"
 className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--body-text)] transition hover:border-primary hover:text-primary dark:border-[var(--border)] dark:bg-[var(--surface)] dark:text-[var(--body-text)] dark:hover:border-primary"
 >
 <ChevronLeft className="h-4 w-4" />
 </button>
 <div className="flex gap-2">
 {testimonials.items.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setActive(idx)}
 aria-label={`Go to testimonial ${idx + 1}`}
 className={`h-2.5 rounded-full transition-all duration-300 ${active === idx ? "w-8 bg-primary" : "w-2.5 bg-black/20 hover:bg-primary/50 dark:bg-[var(--surface-2)]/20 dark:hover:bg-primary/50"}`}
 />
 ))}
 </div>
 <button
 onClick={next}
 aria-label="Next testimonial"
 className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--body-text)] transition hover:border-primary hover:text-primary dark:border-[var(--border)] dark:bg-[var(--surface)] dark:text-[var(--body-text)] dark:hover:border-primary"
 >
 <ChevronRight className="h-4 w-4" />
 </button>
 </div>
 </div>
 </div>
 </section>
 );
}