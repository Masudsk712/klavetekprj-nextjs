"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { blogPosts, featuredPost, blogPageUrl } from "@/data/blogPosts";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function BlogHighlights() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <Container>
        <SectionHeader
          title="From the Klavetek Blog"
          subtitle="Expert insights on AAC blocks, sustainable construction, cost analysis and the building-material technology behind every Klavetek product."
        />

        {/* Featured spotlight — blog-hero.webp */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerFast}
          className="mb-16 md:mb-20"
        >
          <GlassCard className="overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Featured image */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
{/* Featured content */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    Featured
                  </span>
                  <span className="text-xs font-medium text-[var(--muted-text)]">{featuredPost.category}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--heading)] mb-4 group-hover:text-primary transition-colors duration-300">
                  {featuredPost.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--muted-text)] leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>

                <a
                  href={blogPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-[0_12px_35px_rgba(var(--primary-rgb),0.35)] transition-all duration-300 group-hover:gap-3 hover:shadow-[0_18px_50px_rgba(var(--primary-rgb),0.45)]"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
{/* Latest insights grid — klavetek_1.webp … klavetek_5.webp */}
        <SectionHeader
          title="Latest Insights"
          subtitle="Practical articles and updates from Klavetek's engineering team — covering AAC block technology, sustainable construction and smarter building."
        />

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <GlassCard className="overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
{/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="self-start px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  <h4 className="text-lg font-semibold text-[var(--heading)] mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[var(--muted-text)] leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>

                  <a
                    href={blogPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5 w-fit"
                  >
                    Read More
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}