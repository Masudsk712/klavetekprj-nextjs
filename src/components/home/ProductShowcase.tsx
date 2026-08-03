"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Check,
  Ruler,
  Weight,
  ArrowRight,
  Download,
  ChevronRight,
  Box,
} from "lucide-react";
import { products } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce } from "@/lib/animations";

const AUTO_PLAY_INTERVAL = 2000;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easePremium },
  },
};

const productImageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotateX: 15,
    rotateY: -15,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    rotateX: -15,
    rotateY: 15,
    y: -40,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const glowVariants = {
  idle: {
    scale: 1,
    opacity: 0.4,
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const },
  },
  hover: {
    scale: 1.15,
    opacity: 0.7,
    transition: { duration: 0.5 },
  },
};

const floatAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const activeProduct = products.items[activeIndex];

  const nextProduct = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % products.items.length);
  }, []);

  const prevProduct = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) =>
      prev === 0 ? products.items.length - 1 : prev - 1
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextProduct, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextProduct]);

  const handleProductSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
     <section className="relative py-28 md:py-36 lg:py-40 overflow-hidden">
      {/* Premium radial green glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            title={products.title}
            subtitle={products.subtitle}
          />

          <motion.div
            className="mb-16"
          ></motion.div>
          
          <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT: Ultra Premium Product Showcase (55%) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 relative">
            <div className="relative">
              {/* Floating product image with glass background */}
              <motion.div
                className="relative z-10"
                animate={floatAnimation}
              >
                <div className="relative">
                  {/* Soft shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-3xl translate-y-1/2 scale-90 opacity-60" />

                  {/* Green ambient glow */}
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-br from-primary/40 via-accent-glow/20 to-primary/30 rounded-full blur-3xl -z-10"
                    variants={glowVariants}
                    initial="idle"
                    whileHover="hover"
                  />

                  {/* Glass background */}
                  <div className="relative rounded-[32px] bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-white/10 dark:via-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 md:p-12 shadow-2xl">
                    {/* Premium radial lighting */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/20 dark:via-transparent rounded-[32px] pointer-events-none" />

                    <div className="relative aspect-square flex items-center justify-center">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={activeProduct.size}
                          custom={direction}
                          variants={productImageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="relative w-full h-full flex items-center justify-center"
                          style={{ perspective: 1000 }}
                        >
                          <motion.div
                            className="relative w-full h-full"
                            whileHover={{
                              rotateX: 5,
                              rotateY: -5,
                              scale: 1.05,
                              transition: { type: "spring", stiffness: 300, damping: 20 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <Image
                              src={activeProduct.image}
                              alt={activeProduct.title}
                              fill
                              className="object-contain drop-shadow-2xl"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                              priority={activeIndex === 0}
                              loading={activeIndex === 0 ? "eager" : "lazy"}
                            />

                            {/* Reflection below */}
                            <div className="absolute -bottom-20 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-2xl opacity-40 scale-y-[-1]" />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Product Information (45%) */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.size}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: easePremium }}
              >
                {/* Product Name */}
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-[var(--heading)] dark:text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {activeProduct.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] mb-8 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {activeProduct.description}
                </motion.p>

                {/* Specifications */}
                <motion.div
                  className="grid grid-cols-2 gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { label: "Length", value: activeProduct.specs.length, icon: Ruler },
                    { label: "Height", value: activeProduct.specs.height, icon: Ruler },
                    { label: "Thickness", value: activeProduct.specs.thickness, icon: Box },
                    { label: "Weight", value: activeProduct.specs.weight, icon: Weight },
                  ].map((spec, idx) => (
                    <motion.div
                      key={spec.label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 dark:bg-[var(--surface)]/40 backdrop-blur-xl p-4 hover-lift"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <spec.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 dark:text-primary/80">
                          {spec.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[var(--heading)] dark:text-white">
                        {spec.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Applications */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-base font-semibold text-[var(--heading)] dark:text-white mb-3">
                    Applications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeProduct.applications.map((app, idx) => (
                      <motion.div
                        key={app}
                        className="flex items-center gap-2.5 text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {app}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a
                    href="/products"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>

                  <motion.a
                    href="/documents/brochure.pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Datasheet
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

         {/* Product Tabs */}
         <motion.div
           className="mt-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          <div className="relative inline-flex items-center gap-1 p-1.5 rounded-full bg-[var(--surface)]/60 dark:bg-[var(--surface)]/40 backdrop-blur-xl border border-[var(--border)] mx-auto overflow-x-auto max-w-full">
            {/* Animated indicator */}
            <motion.div
              className="absolute h-[calc(100%-12px)] bg-gradient-to-r from-primary to-primary-hover rounded-full shadow-lg"
              style={{
                top: "6px",
                height: "calc(100% - 12px)",
              }}
              animate={{
                x: `calc(${activeIndex * 100}% + ${activeIndex * 4}px)`,
                width: `calc(${100 / products.items.length}% - 4px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />

            {products.items.map((item, idx) => (
              <motion.button
                key={item.size}
                onClick={() => handleProductSelect(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                  activeIndex === idx
                    ? "text-white"
                    : "text-[var(--body-text)] dark:text-[var(--muted-text)] hover:text-[var(--heading)] dark:hover:text-white"
                }`}
              >
                {item.size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}