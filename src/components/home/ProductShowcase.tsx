"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Ruler, Weight, ArrowRight, ChevronRight } from "lucide-react";
import { products } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

export default function ProductShowcase() {
 const [activeProduct, setActiveProduct] = useState(products.items[0]);

 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative green glow */}
 <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
 <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-hover/10 rounded-full blur-3xl pointer-events-none dark:bg-accent-glow/10" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={products.title} subtitle={products.subtitle} />

 {/* Size Selector */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 className="flex flex-wrap justify-center gap-3 mb-14"
 >
 {products.items.map((item, idx) => (
 <motion.button
 key={item.size}
 onClick={() => setActiveProduct(item)}
 whileHover={{ scale: 1.06 }}
 whileTap={{ scale: 0.96 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
 activeProduct.size === item.size
 ? "bg-primary text-white border-primary shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)]"
 : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:bg-[var(--surface)] dark:text-[var(--body-text)] dark:border-[var(--border)] dark:hover:border-primary/40"
 }`}
 >
 {item.size}
 </motion.button>
 ))}
 </motion.div>

 {/* Product Detail */}
 <AnimatePresence mode="wait">
 <motion.div
 key={activeProduct.size}
 initial={{ opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -24 }}
 transition={{ duration: 0.35, ease: easePremium }}
 >
 <GlassCard hover={false} elevated className="p-8 md:p-12 overflow-hidden">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
 {/* Product Visual */}
 <motion.div
 whileHover={{ scale: 1.02 }}
 className="relative"
 >
 <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary/10 to-primary-hover/5 border border-primary/15 overflow-hidden shadow-[0_24px_70px_rgba(var(--primary-rgb),0.10)] dark:from-primary/15 dark:to-primary-hover/10 dark:border-primary/25 dark:shadow-[0_24px_70px_rgba(var(--primary-rgb),0.15)]">
 <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5" />
 <div className="relative h-full flex flex-col items-center justify-center p-8">
 <div className="w-28 h-28 rounded-3xl bg-[var(--surface)] border border-primary/15 shadow-sm flex items-center justify-center mb-5 dark:bg-[var(--surface)] dark:border-primary/25">
 <span className="text-3xl font-bold text-primary">{activeProduct.size}</span>
 </div>
 <h3 className="text-2xl font-bold text-[var(--heading)] dark:text-white">{activeProduct.title}</h3>
 <p className="text-sm text-[var(--muted-text)] mt-2 max-w-sm text-center leading-relaxed dark:text-[var(--muted-text)]">{activeProduct.description}</p>
 </div>
 </div>
 </motion.div>

 {/* Product Details */}
 <div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
 <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 hover-lift dark:border-[var(--border)] dark:bg-[var(--surface)]/70">
 <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1 block dark:text-primary/80">Length</span>
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{activeProduct.specs.length}</span>
 </div>
 <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 hover-lift dark:border-[var(--border)] dark:bg-[var(--surface)]/70">
 <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1 block dark:text-primary/80">Height</span>
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{activeProduct.specs.height}</span>
 </div>
 <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 hover-lift dark:border-[var(--border)] dark:bg-[var(--surface)]/70">
 <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1 block dark:text-primary/80">Thickness</span>
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{activeProduct.specs.thickness}</span>
 </div>
 <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-4 hover-lift dark:border-[var(--border)] dark:bg-[var(--surface)]/70">
 <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-1 block dark:text-primary/80">Weight</span>
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{activeProduct.specs.weight}</span>
 </div>
 </div>

 <h4 className="text-base font-semibold text-[var(--heading)] dark:text-white mb-3">Applications</h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
 {activeProduct.applications.map((app) => (
 <div key={app} className="flex items-center gap-2.5 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
 {app}
 </div>
 ))}
 </div>

 <motion.a
 href="/products"
 whileHover={{ x: 5 }}
 transition={{ ease: easePremium }}
 className="inline-flex items-center gap-2 text-primary font-semibold text-sm group"
 >
 View Full Details
 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
 </motion.a>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 </AnimatePresence>
 </div>
 </section>
 );
}