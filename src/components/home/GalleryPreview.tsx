"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
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

export default function GalleryPreview() {
 const items = [
 { label: "Factory", color: "from-primary/20 to-primary-hover/10" },
 { label: "Machinery", color: "from-primary/15 to-primary-hover/10" },
 { label: "Production", color: "from-primary/20 to-primary-hover/10" },
 { label: "Projects", color: "from-primary/15 to-primary-hover/10" },
 ];

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
 className="grid grid-cols-2 md:grid-cols-4 gap-4"
 >
 {items.map((item, index) => (
 <motion.div
 key={item.label}
 variants={itemVariants}
 whileHover={{ y: -6, scale: 1.02 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 className="group relative aspect-square rounded-3xl overflow-hidden border border-primary/15 bg-[var(--surface)] shadow-[0_24px_70px_rgba(0, 0, 0,0.08)] cursor-pointer hover-lift dark:bg-[var(--surface)] dark:border-primary/25 dark:shadow-none"
 >
 <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-105`} />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent dark:from-black/70" />
 <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
 <div className="w-14 h-14 rounded-2xl bg-[var(--surface)]/90 backdrop-blur-md flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-500 dark:bg-[var(--surface)]/90">
 <ImageIcon className="w-6 h-6 text-primary" />
 </div>
 <span className="text-sm font-semibold text-[var(--heading)] dark:text-white">{item.label}</span>
 </div>
 </motion.div>
 ))}
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 transition={{ delay: 0.3 }}
 className="text-center mt-10"
 >
 <Link
 href="/gallery"
 className="btn-primary inline-flex"
 >
 <span>View Full Gallery</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 </motion.div>
 </div>
 </section>
 );
}
