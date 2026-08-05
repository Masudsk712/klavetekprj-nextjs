"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Check, Download, FileText, MessageSquare } from "lucide-react";
import { productsPage } from "@/data/products";
import SectionHeader from "@/components/shared/SectionHeader";
import { easePremium, viewportOnce } from "@/lib/animations";

// ─── Animation Variants ────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: easePremium }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.5, ease: easePremium }
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easePremium }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.4, ease: easePremium }
  },
};

const specCardVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.5,
      ease: easePremium,
    },
  }),
};


// ─── Main Component ────────────────────────────────────────────

export default function ProductCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { products } = productsPage;
  const currentProduct = products[currentIndex];

  // ─── Auto-play Logic ──────────────────────────────────────
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
  }, [products.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isInView && !isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [isInView, isPaused, startAutoPlay, stopAutoPlay]);

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);
    // Reset timer on manual interaction
    if (isPaused) return;
    stopAutoPlay();
    startAutoPlay();
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoPlay();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (isInView) startAutoPlay();
  };

  // ─── Progress calculation ─────────────────────────────────
  const progress = ((currentIndex + 1) / products.length) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background matching Why Klavetek Stands Out */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E/svg%3E")`,
        }}
      />

      {/* Soft gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
            }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-5">
              Premium AAC Blocks
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight"
          >
            Our Product{" "}
            <span className="bg-gradient-to-r from-primary via-accent-glow to-primary bg-clip-text text-transparent">
              Range
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
            }}
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {productsPage.hero.subtitle}
          </motion.p>
        </div>

        {/* ─── Product Showcase ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Product Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-1">
            {/* Soft radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-60" />
            
            {/* Glass panel */}
            <div className="relative w-full max-w-lg aspect-square rounded-[48px] bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-green-500/20 shadow-premiumLg overflow-hidden">
              
              {/* Ambient green glow */}
              <div className="absolute -inset-20 bg-gradient-radial from-primary/30 via-transparent to-transparent opacity-40 blur-3xl" />
              
              {/* Animated Image Container */}
              <div className="relative h-full w-full flex items-center justify-center p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct.id}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full h-full flex items-center justify-center"
                    style={{ 
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Gentle float */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-4/5 h-4/5"
                    >
                      {/* Soft shadow */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/20 blur-2xl rounded-full" />
                      
                      {/* Green glow */}
                      <div className="absolute -inset-4 bg-gradient-radial from-primary/40 via-primary/10 to-transparent opacity-60 blur-xl rounded-full" />
                      
                       {/* Image */}
                       <Image
                         src={`/images/products/product-${currentProduct.size.replace('mm', '')}.webp`}
                         alt={currentProduct.title}
                         fill
                         sizes="(max-width: 1024px) 100vw, 50vw"
                         className="object-contain relative z-10 drop-shadow-2xl"
                         priority={currentIndex === 0}
                         loading={currentIndex === 0 ? "eager" : "lazy"}
                       />
                      
                      {/* Reflection */}
                      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent opacity-50 blur-2xl -z-10" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Hover movement effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="order-2 lg:order-2 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Product Title */}
                <motion.div variants={contentVariants}>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                    {currentProduct.size} AAC Block
                  </h3>
                  <p className="text-lg text-primary font-semibold mb-4">
                    {currentProduct.tagline}
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentProduct.description}
                  </p>
                </motion.div>

                {/* Specifications Grid */}
                <motion.div variants={contentVariants}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-4">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentProduct.specs.map((spec, i) => (
                      <motion.div
                        key={spec.label}
                        custom={i}
                        variants={specCardVariants}
                        className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-green-500/20"
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {spec.label}
                        </div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {spec.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Applications */}
                <motion.div variants={contentVariants}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-4">
                    Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.applications.map((app, i) => (
                      <motion.div
                        key={app}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        <span>{app}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={contentVariants} className="flex flex-wrap gap-3 pt-2">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-hover text-white font-semibold transition-all duration-300 shadow-lg">
                    <FileText className="w-5 h-5" />
                    View Details
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-green-500/30 text-gray-900 dark:text-white font-semibold transition-all duration-300">
                    <MessageSquare className="w-5 h-5" />
                    Get Quote
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-green-500/30 text-gray-900 dark:text-white font-semibold transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Download Datasheet
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ─── Product Tabs ──────────────────────────────── */}
            <div className="pt-8">
              <div className="flex items-center justify-center gap-1 p-1 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-full border border-green-500/20 shadow-lg overflow-x-auto">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleTabClick(index)}
                    className={`relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      index === currentIndex
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {index === currentIndex && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover rounded-full"
                transition={{ duration: 0.4, ease: easePremium }}
              />
                    )}
                    <span className="relative z-10">{product.size}</span>
                  </button>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className="group relative h-1.5 flex-1 max-w-[60px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-all duration-300 hover:max-w-[80px]"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent-glow rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: index <= currentIndex ? 1 : 0,
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: easePremium 
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Play/Pause indicator */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <span>{isPaused ? "Paused" : "Auto-rotating"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}