"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";
import { productThicknesses } from "@/data/productCatalogue";
import { easePremium, viewportOnce } from "@/lib/animations";

interface ProductComparisonProps {
  highlightId?: string;
}

const recommendation = (product: Product): string =>
  product.tagline || product.applications[0] || "";

/**
 * PRODUCT SIZE COMPARISON — responsive, horizontally scrollable table
 * comparing the 5 AAC block sizes. Specs come directly from product data.
 */
export default function ProductComparison({
  highlightId,
}: ProductComparisonProps) {
  const specLabels = productThicknesses[0].specs.map((s) => s.label);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easePremium },
              },
            }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
          >
            Size Comparison
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: easePremium },
              },
            }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--heading)] tracking-tight"
          >
            Compare All AAC Block Sizes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easePremium },
              },
            }}
            className="mt-5 text-base text-[var(--muted-text)] max-w-2xl mx-auto leading-relaxed"
          >
            A side-by-side look at every Klavetek thickness so you can pick the
            right block for your project at a glance.
          </motion.p>
        </div>

        {/* Responsive scrollable table container */}
        <div className="overflow-x-auto rounded-[22px] border border-[var(--border)] bg-[var(--surface)]/70 dark:bg-[var(--surface)]/60 backdrop-blur-xl shadow-card">
          <table className="w-full border-collapse text-sm min-w-[640px]">
            <thead>
              <tr className="bg-primary/5 border-b border-[var(--border)]">
                <th
                  scope="col"
                  className="text-left px-4 py-3 md:px-6 text-[10px] md:text-xs text-[var(--muted-text)] uppercase tracking-wider font-medium"
                >
                  Specification
                </th>
                {productThicknesses.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={`text-center px-3 py-3 md:px-5 ${
                      p.id === highlightId
                        ? "bg-primary/10 text-primary"
                        : "text-[var(--muted-text)]"
                    }`}
                  >
                    <span className="block text-[10px] md:text-xs uppercase tracking-wider mb-1">
                      AAC Block
                    </span>
                    <span className="block font-black text-base md:text-lg">
                      {p.size}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specLabels.map((label) => (
                <tr
                  key={label}
                  className="spec-row border-b border-[var(--border)] last:border-b-0"
                >
                  <td className="px-4 py-3 md:px-6 text-xs text-[var(--muted-text)] uppercase tracking-wider font-medium">
                    {label}
                  </td>
                  {productThicknesses.map((p) => {
                    const spec = p.specs.find((s) => s.label === label);
                    return (
                      <td
                        key={p.id}
                        className={`text-center px-3 py-3 md:px-5 ${
                          p.id === highlightId
                            ? "text-primary font-bold"
                            : "text-[var(--body-text)]"
                        }`}
                      >
                        {spec ? spec.value : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Recommended application row */}
              <tr className="spec-row border-t border-[var(--border)]">
                <td className="px-4 py-3 md:px-6 text-xs text-[var(--muted-text)] uppercase tracking-wider font-medium">
                  Recommended For
                </td>
                {productThicknesses.map((p) => (
                  <td
                    key={p.id}
                    className="text-center px-3 py-3 md:px-5 text-[var(--muted-text)]"
                  >
                    <span className="block text-xs leading-tight">
                      {recommendation(p)}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
