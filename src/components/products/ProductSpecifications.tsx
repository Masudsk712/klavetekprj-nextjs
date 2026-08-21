"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import type { Product } from "@/types";
import { technicalSpecs } from "@/data/productCatalogue";
import { easePremium, viewportOnce } from "@/lib/animations";

interface ProductSpecificationsProps {
  product: Product;
}

/** Existing Klavetek datasheet / brochure file served from /public. */
const DATASHEET_LINK = "/Klavetek-EBrochure-2022-23.pdf";

/**
 * TECHNICAL SPECIFICATIONS — clean, professional table.
 * Rows blend the selected product's dimensions with the shared technical
 * specs. All values come from existing project data.
 */
export default function ProductSpecifications({
  product,
}: ProductSpecificationsProps) {
  const prefersReducedMotion = useReducedMotion();

  const sharedSpecs = technicalSpecs.specs.filter(
    (spec) => spec.parameter !== "Density",
  );

  const headerVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
      };
  const rowVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
      };

  return (
    <section className="relative py-20 md:py-24 bg-[var(--secondary-bg)] dark:bg-[var(--surface-2)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-12">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={headerVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
          >
            Technical Specifications
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={headerVariants}
            className="mt-4 text-3xl md:text-4xl font-bold text-[var(--heading)] tracking-tight"
          >
            {product.title}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={headerVariants}
            className="mt-4 max-w-2xl mx-auto text-base text-[var(--muted-text)] leading-relaxed"
          >
            Dimensions and performance values are independently tested per
            IS 2185 (Part 3) and consistent across the Klavetek AAC range.
          </motion.p>
        </div>
{/* Specification table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={rowVariants}
        >
          <div className="overflow-x-auto rounded-[22px] border border-[var(--border)] bg-[var(--surface)]/70 dark:bg-[var(--surface)]/60 backdrop-blur-xl shadow-card">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary/5 border-b border-[var(--border)]">
                  <th scope="col" className="text-left px-6 py-3 text-xs text-[var(--muted-text)] uppercase tracking-wider font-medium">
                    Property
                  </th>
                  <th scope="col" className="text-left px-6 py-3 text-xs text-[var(--muted-text)] uppercase tracking-wider font-medium">
                    Specification
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.label} className="spec-row border-b border-[var(--border)]">
                    <td className="px-6 py-3.5 text-xs text-[var(--muted-text)] uppercase tracking-wider">
                      {spec.label}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[var(--heading)] tabular-nums">
                      {spec.value}
                    </td>
                  </tr>
                ))}
                {sharedSpecs.map((spec) => (
                  <tr key={spec.parameter} className="spec-row border-b border-[var(--border)]">
                    <td className="px-6 py-3.5 text-xs text-[var(--muted-text)] uppercase tracking-wider">
                      {spec.parameter}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[var(--heading)] tabular-nums">
                      {spec.value} {spec.unit}
                    </td>
                  </tr>
                ))}
                <tr className="spec-row">
                  <td className="px-6 py-3.5 text-xs text-[var(--muted-text)] uppercase tracking-wider">
                    Standard
                  </td>
                  <td className="px-6 py-3.5 text-xs font-medium text-primary">
                    IS 2185 (Part 3)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Subtle datasheet download */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={headerVariants}
          className="mt-8 flex justify-center"
        >
          <a
            href={DATASHEET_LINK}
            download="Klavetek-Product-Datasheet.pdf"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Download the Klavetek technical datasheet"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            <span>Download Technical Datasheet</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}