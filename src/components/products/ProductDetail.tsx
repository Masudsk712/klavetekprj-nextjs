"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Download, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { easePremium } from "@/lib/animations";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: easePremium }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-[var(--border)] text-[var(--heading)] dark:text-white text-sm font-semibold hover:border-primary/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easePremium }}
            className="relative flex items-center justify-center"
          >
            {/* Soft radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-60" />
            
            {/* Glass panel */}
            <div className="relative w-full max-w-lg aspect-square rounded-[48px] bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-primary/30 shadow-card overflow-hidden">
              
              {/* Ambient green glow */}
              <div className="absolute -inset-20 bg-gradient-radial from-primary/30 via-transparent to-transparent opacity-40 blur-3xl" />
              
              {/* Image Container */}
              <div className="relative h-full w-full flex items-center justify-center p-8 md:p-12">
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
                    src={`/images/products/product-${product.size.replace('mm', '')}.webp`}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain relative z-10 drop-shadow-2xl"
                    priority
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.getAttribute("data-fallback") !== "1") {
                        img.setAttribute("data-fallback", "1");
                        img.src = "/images/products/products-hero.webp";
                      }
                    }}
                  />
                  
                  {/* Reflection */}
                  <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent opacity-50 blur-2xl -z-10" />
                </motion.div>
              </div>

              {/* Hover movement effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* RIGHT: Product Details */}
          <div className="space-y-8">
            {/* Product Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easePremium }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading)] dark:text-[var(--heading)] mb-3 tracking-tight">
                {product.size} AAC Block
              </h1>
              <p className="text-xl text-primary font-semibold mb-4">
                {product.tagline}
              </p>
              <p className="text-base text-[var(--body-text)] dark:text-[var(--muted-text)] leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
            >
              <h3 className="text-xl font-bold text-[var(--heading)] dark:text-[var(--heading)] mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.map((spec: { label: string; value: string }, i: number) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                    className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-primary/20"
                  >
                    <div className="text-xs text-[var(--muted-text)] dark:text-[var(--muted-text)] mb-1">
                      {spec.label}
                    </div>
                    <div className="text-sm font-bold text-[var(--heading)] dark:text-[var(--heading)]">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Advantages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
            >
              <h3 className="text-xl font-bold text-[var(--heading)] dark:text-[var(--heading)] mb-4">
                Advantages
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {product.advantages.map((advantage: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20"
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--body-text)] dark:text-[var(--muted-text)]">
                      {advantage}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easePremium }}
            >
              <h3 className="text-xl font-bold text-[var(--heading)] dark:text-[var(--heading)] mb-4">
                Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app: string, i: number) => (
                  <motion.div
                    key={app}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-[var(--heading)] dark:text-[var(--heading)]"
                  >
                    <Check className="w-4 h-4 text-primary" />
                    <span>{app}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easePremium }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link
                href={`/contact?product=${encodeURIComponent(product.title)}`}
                className="btn-primary"
                aria-label={`Get a quote for ${product.title}`}
              >
                <MessageSquare className="w-5 h-5" />
                Get Quote
              </Link>
              <a
                href="/Klavetek-EBrochure-2022-23.pdf"
                download
                className="btn-ghost"
                aria-label="Download the Klavetek product datasheet / brochure PDF"
              >
                <Download className="w-5 h-5" />
                Download Datasheet
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}