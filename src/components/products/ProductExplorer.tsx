"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, Download, FileText, MessageSquare } from "lucide-react";
import type { Product } from "@/types";
import { productImage } from "@/data/productCatalogue";
import { easePremium, viewportOnce } from "@/lib/animations";

interface ProductExplorerProps {
  products: Product[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

/** Existing Klavetek datasheet / brochure file served from /public. */
const DATASHEET_LINK = "/Klavetek-EBrochure-2022-23.pdf";

/** Key facts surfaced in the details panel (avoids duplicating the full table). */
const QUICK_SPEC_LABELS = ["Thickness", "Weight", "Blocks per m²", "Density"];

export default function ProductExplorer({
  products,
  selectedIndex,
  onSelect,
}: ProductExplorerProps) {
  const prefersReducedMotion = useReducedMotion();
  const product = products[selectedIndex];

  const panelHidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 16 };
  const panelVisible = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  const quickFacts = product.specs.filter((spec) =>
    QUICK_SPEC_LABELS.includes(spec.label),
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-24">
        {/* SECTION 02 — PRODUCT EXPLORER header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={
              prefersReducedMotion
                ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
                  }
            }
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
          >
            Product Range
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={
              prefersReducedMotion
                ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                : {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
                  }
            }
            className="mt-4 text-3xl md:text-4xl font-bold text-[var(--heading)] tracking-tight"
          >
            Explore the Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={
              prefersReducedMotion
                ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
                : {
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
                  }
            }
            className="mt-4 text-base text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed"
          >
            Select a block thickness to view its dimensions, benefits and
            recommended application.
          </motion.p>
        </div>
{/* Selector — horizontally scrollable on mobile */}
        <div
          role="tablist"
          aria-label="Select AAC block thickness"
          className="mt-10 flex overflow-x-auto px-1 pb-1 mx-auto max-w-3xl scrollbar-none"
        >
          <div className="inline-flex flex-nowrap gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-green-500/20 shadow-lg">
            {products.map((p, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`thickness-tab-${p.size}`}
                  aria-selected={active}
                  aria-controls="thickness-detail"
                  onClick={() => onSelect(index)}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    active
                      ? "text-white bg-gradient-to-r from-primary to-primary-hover shadow-md shadow-primary/30"
                      : "text-[var(--muted-text)] hover:text-[var(--heading)] dark:text-[var(--muted-text)] dark:hover:text-white"
                  }`}
                >
                  {p.size.replace("mm", "")} mm
                </button>
              );
            })}
          </div>
        </div>
{/* SECTION 03 — PRODUCT DETAILS for the selected thickness */}
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={panelHidden}
            animate={panelVisible}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: easePremium }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            {/* Product image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent opacity-60" />
              <div className="relative w-full max-w-md aspect-square rounded-[44px] bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-green-500/20 shadow-card overflow-hidden">
                <div className="relative h-full w-full flex items-center justify-center p-8 md:p-10">
                  <Image
                    src={productImage(product.size)}
                    alt={`Klavetek ${product.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Product information */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--heading)] tracking-tight">
                {product.title}
              </h3>
              <p className="mt-2 inline-block text-sm font-semibold text-primary">
                {product.tagline}
              </p>
              <p className="mt-4 text-base text-[var(--body-text)] leading-relaxed">
                {product.description}
              </p>

              {/* Key benefits */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">
                  Key Benefits
                </p>
                <ul className="mt-3 grid gap-2">
                  {product.advantages.slice(0, 4).map((advantage) => (
                    <li key={advantage} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-[var(--body-text)] leading-snug">
                        {advantage}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick spec chips */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickFacts.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-[var(--border)]"
                  >
                    <div className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-sm font-bold text-[var(--heading)] mt-0.5 tabular-nums">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/products/${product.id}`}
                  className="btn-primary"
                  aria-label={`View full details for ${product.title}`}
                >
                  <FileText className="w-5 h-5" />
                  <span>View Full Details</span>
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost border-[var(--border)] text-[var(--heading)] dark:text-white hover:border-primary/50"
                  aria-label="Request a quote for Klavetek AAC blocks"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Get a Quote</span>
                </Link>
                <a
                  href={DATASHEET_LINK}
                  download="Klavetek-Product-Datasheet.pdf"
                  className="btn-ghost border-[var(--border)] text-[var(--heading)] dark:text-white hover:border-primary/50"
                  aria-label="Download Klavetek technical datasheet"
                >
                  <Download className="w-5 h-5" />
                  <span>Datasheet</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}