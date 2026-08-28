"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import {
  blogPosts,
  featuredPost,
  categories,
  blogPageUrl,
  FALLBACK_IMAGE,
  type BlogPost,
} from "@/data/blogPosts";
import { easePremium, viewportOnce } from "@/lib/animations";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const postUrl = (post: BlogPost) => post.articleUrl ?? blogPageUrl;

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="relative bg-[var(--secondary-bg)] overflow-hidden">
      {/* subtle radial wash for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

      <Container>
        <div className="relative py-14 md:py-20 lg:py-24">
          {/* ===== Featured article ===== */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <GlassCard className="overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image side */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[440px] overflow-hidden">
                  <Image
                    src={featuredPost.image || FALLBACK_IMAGE}
                    alt={`Featured article: ${featuredPost.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content side */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      Featured
                    </span>
                    <span className="text-xs font-semibold text-[var(--muted-text)] uppercase tracking-wide">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-bold tracking-tight text-[var(--heading)] leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted-text)] leading-relaxed mb-8 max-w-[560px]">
                    {featuredPost.excerpt}
                  </p>

                  <a
                    href={postUrl(featuredPost)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read full article: ${featuredPost.title}`}
                    className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm font-semibold transition-all duration-300 hover:bg-[var(--primary-hover)] hover:gap-3"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ===== Latest insights heading ===== */}
          <div className="mt-16 md:mt-20">
            <SectionHeader
              title="Latest Insights"
              subtitle="Practical articles and updates from Klavetek's engineering team — covering AAC block technology, sustainable construction and smarter building."
            />
          </div>

          {/* ===== Category filter ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="mb-12 flex items-center gap-2.5 overflow-x-auto pb-2 justify-start md:justify-center scrollbar-none"
            role="group"
            aria-label="Filter blog posts by category"
          >
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_10px_30px_rgba(var(--primary-rgb),0.35)]"
                      : "bg-[var(--surface)] text-[var(--body-text)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </motion.div>
{/* ===== Blog card grid ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: easePremium }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.length === 0 ? (
                <p className="md:col-span-2 lg:col-span-3 py-10 text-center text-[var(--muted-text)]">
                  No posts in this category yet.
                </p>
              ) : (
                filteredPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants} className="h-full">
                    <GlassCard className="group flex h-full flex-col overflow-hidden">
                      {/* Image (16:9) */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.image || FALLBACK_IMAGE}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mb-3 self-start rounded-full bg-[var(--primary)]/[0.12] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
                          {post.category}
                        </span>

                        <h3 className="mb-3 text-lg font-bold leading-snug text-[var(--heading)] transition-colors duration-300 group-hover:text-primary">
                          {post.title}
                        </h3>

                        <p className="mb-5 flex-1 text-sm text-[var(--muted-text)] leading-relaxed">
                          {post.excerpt}
                        </p>

                        <a
                          href={postUrl(post)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read more: ${post.title}`}
                          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--primary)] transition-all duration-300 group-hover:gap-2.5"
                        >
                          Read More
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}