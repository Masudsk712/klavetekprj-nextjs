"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react";
import { blogData } from "@/data/blog";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.08, delayChildren: 0.05 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function BlogContent() {
 const [activeCategory, setActiveCategory] = useState("All");

 const filteredPosts =
 activeCategory === "All"
 ? blogData.posts
 : blogData.posts.filter((post) => post.category === activeCategory);

 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={blogData.hero.title} subtitle={blogData.hero.subtitle} />

 {/* Category Filter */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={viewportOnce}
 className="flex flex-wrap justify-center gap-2 mb-12"
 >
 {blogData.categories.map((category) => (
 <motion.button
 key={category}
 onClick={() => setActiveCategory(category)}
 whileHover={{ scale: 1.04 }}
 whileTap={{ scale: 0.96 }}
 transition={{ type: "spring", stiffness: 350, damping: 20 }}
 className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
 activeCategory === category
 ? "bg-primary text-white border-primary shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)]"
 : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-primary/40 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
 }`}
 >
 {category}
 </motion.button>
 ))}
 </motion.div>

 {/* Blog Grid */}
 <AnimatePresence mode="wait">
 <motion.div
 key={activeCategory}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.35, ease: easePremium }}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
 >
 {filteredPosts.map((post, index) => (
 <motion.div key={post.id} variants={itemVariants}>
 <GlassCard className="overflow-hidden group h-full flex flex-col">
 {/* Image Placeholder */}
 <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary-hover/5 flex items-center justify-center">
 <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-primary/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
 <FileText className="w-8 h-8 text-primary" />
 </div>
 </div>

 {/* Content */}
 <div className="p-6 flex flex-col flex-1">
 <div className="flex items-center gap-3 mb-3 text-xs text-[var(--muted-text)]">
 <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
 {post.category}
 </span>
 <span className="flex items-center gap-1">
 <Clock className="w-3 h-3" /> {post.readTime}
 </span>
 </div>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-3 group-hover:text-primary transition-colors">
 {post.title}
 </h3>
 <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-4 flex-1">{post.excerpt}</p>
 <div className="flex items-center justify-between pt-4 border-t border-primary/10">
 <span className="flex items-center gap-1.5 text-xs text-[var(--muted-text)]">
 <Calendar className="w-3.5 h-3.5" />
 {new Date(post.date).toLocaleDateString("en-IN", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })}
 </span>
 <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
 Read More <ArrowRight className="w-3.5 h-3.5" />
 </span>
 </div>
 </div>
 </GlassCard>
 </motion.div>
 ))}
 </motion.div>
 </AnimatePresence>
 </div>
 </section>
 );
}
