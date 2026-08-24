"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Check, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { productsPage } from "@/data/products";
import { easePremium, viewportOnce } from "@/lib/animations";

// ─── Animation Variants ────────────────────────────────────────

const imageFloatVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: easePremium }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateY: 15,
    transition: { duration: 0.5, ease: easePremium }
  }
};

const contentSlideVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easePremium, staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.4, ease: easePremium }
  }
};

// ─── Main Component ────────────────────────────────────────────

export default function ProductCardGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { products } = productsPage;
  const currentProduct = products[currentIndex];

  // ─── Auto-play Logic ──────────────────────────────────────
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4500);
  }, [products.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [isInView, startAutoPlay, stopAutoPlay]);

  // InView detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProductClick = (index: number) => {
    setCurrentIndex(index);
    stopAutoPlay();
    startAutoPlay();
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-primary/[0.04] pointer-events-none" />
      
      {/* Grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316A34A' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
          }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Product Range
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] dark:text-white mb-4 tracking-tight">
            Our Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
              AAC Blocks
            </span>
          </h2>

          <p className="text-base md:text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
            Available in multiple sizes for every construction need
          </p>
        </motion.div>

        {/* ─── Product Navigation Tabs ──────────────────────── */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(index)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  index === currentIndex
                    ? "text-white scale-105"
                    : "text-[var(--muted-text)] dark:text-[var(--muted-text)] hover:text-[var(--heading)] dark:hover:text-[var(--heading)]"
                }`}
              >
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover rounded-full"
                    transition={{ duration: 0.4, ease: easePremium }}
                  />
                )}
                <span className="relative z-10">{product.size}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-1.5 max-w-md mx-auto">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleProductClick(index)}
                className="group relative h-1.5 flex-1 bg-[var(--border)] dark:bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:h-2"
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
        </div>

        {/* ─── Product Showcase ─────────────────────────────── */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              variants={contentSlideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center"
            >
              {/* LEFT: Product Image */}
              <motion.div 
                className="relative flex items-center justify-center order-1 md:order-1"
                variants={imageFloatVariants}
              >
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  {/* Ambient glow */}
                  <div className="absolute -inset-8 bg-gradient-radial from-primary/30 via-transparent to-transparent opacity-60 blur-3xl" />
                  
                  {/* Product image with floating animation */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    {/* Soft shadow */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/20 blur-2xl rounded-full" />
                    
                    {/* Image */}
                    <Image
                      src={`/images/products/product-${currentProduct.size.replace('mm', '')}.webp`}
                      alt={currentProduct.title}
                      width={400}
                      height={400}
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                      priority={currentIndex === 0}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.getAttribute("data-fallback") !== "1") {
                          img.setAttribute("data-fallback", "1");
                          img.src = "/images/products/products-hero.webp";
                        }
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* CENTER: Dimensions & Size */}
              <motion.div 
                className="text-center order-2 md:order-2 space-y-4"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.6, ease: easePremium }
                  }
                }}
              >
                {/* Size Badge */}
                <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-xl">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
                    {currentProduct.size}
                  </div>
                  <div className="text-sm text-primary font-semibold mt-1">mm thickness</div>
                </div>

                {/* Dimensions */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--heading)] dark:text-white">600</div>
                    <div className="text-xs text-[var(--muted-text)]">Length (mm)</div>
                  </div>
                  <div className="w-px h-8 bg-[var(--border)] dark:bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--heading)] dark:text-white">200</div>
                    <div className="text-xs text-[var(--muted-text)]">Height (mm)</div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm md:text-base text-primary font-semibold">
                  {currentProduct.tagline}
                </p>
              </motion.div>

              {/* RIGHT: Brief Details */}
              <motion.div 
                className="space-y-4 order-3 md:order-3"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.6, ease: easePremium, staggerChildren: 0.1 }
                  }
                }}
              >
                {/* Description */}
                <p className="text-sm text-[var(--body-text)] dark:text-[var(--muted-text)] leading-relaxed line-clamp-3">
                  {currentProduct.description}
                </p>

                {/* Key Specs Preview */}
                <div className="grid grid-cols-2 gap-2">
                  {currentProduct.specs.slice(0, 4).map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-[var(--border)]"
                    >
                      <div className="text-[10px] text-[var(--muted-text)] dark:text-[var(--muted-text)] uppercase tracking-wide">
                        {spec.label}
                      </div>
                      <div className="text-sm font-bold text-[var(--heading)] dark:text-white tabular-nums">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Applications Preview */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {currentProduct.applications.slice(0, 3).map((app) => (
                      <span
                        key={app}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[11px] text-[var(--heading)] dark:text-white"
                      >
                        <Check className="w-3 h-3 text-primary" />
                        {app}
                      </span>
                    ))}
                    {currentProduct.applications.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-[var(--surface-2)] dark:bg-white/10 text-[11px] text-[var(--muted-text)] dark:text-[var(--muted-text)] font-medium">
                        +{currentProduct.applications.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Button */}
                <Link
                  href={`/products/${currentProduct.id}`}
                  className="btn-primary"
                >
                  <FileText className="w-4 h-4" />
                  Details
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}