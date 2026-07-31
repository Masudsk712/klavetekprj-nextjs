"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { productsPage } from "@/data/products";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
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

export default function ProductCard() {
 const { products } = productsPage;

 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title="Our Product Range" subtitle="Select your required block size to view detailed specifications, advantages, and applications." />

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 className="space-y-8"
 >
 {products.map((product, index) => (
 <motion.div key={product.id} variants={itemVariants}>
 <GlassCard hover={false} elevated className="overflow-hidden">
 <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
 {/* Product Header */}
 <div className="lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-primary/10 to-primary-hover/5 border-b lg:border-b-0 lg:border-r border-primary/10">
 <div className="text-sm font-bold text-primary mb-2">{product.size}</div>
 <h3 className="text-2xl font-bold text-[var(--heading)] mb-2">{product.title}</h3>
 <p className="text-sm text-[var(--muted-text)] mb-4">{product.tagline}</p>
 <p className="text-sm text-[var(--body-text)] leading-relaxed">{product.description}</p>
 </div>

 {/* Specs */}
 <div className="lg:col-span-2 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-primary/10">
 <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-4">Specifications</h4>
 <div className="grid grid-cols-2 gap-3">
 {product.specs.map((spec) => (
 <div key={spec.label} className="text-sm">
 <span className="text-[var(--muted-text)]">{spec.label}: </span>
 <span className="font-semibold text-[var(--heading)]">{spec.value}</span>
 </div>
 ))}
 </div>
 
 <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/70 mt-6 mb-3">Advantages</h4>
 <div className="space-y-2">
 {product.advantages.map((adv) => (
 <div key={adv} className="flex items-start gap-2 text-sm">
 <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
 <span className="text-[var(--body-text)]">{adv}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Applications */}
 <div className="p-8 md:p-10 bg-gradient-to-br from-white to-primary/[0.04]">
 <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-4">Applications</h4>
 <div className="space-y-3">
 {product.applications.map((app) => (
 <div key={app} className="flex items-center gap-2 text-sm">
 <div className="w-2 h-2 rounded-full bg-primary" />
 <span className="text-[var(--body-text)]">{app}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>
 );
}
