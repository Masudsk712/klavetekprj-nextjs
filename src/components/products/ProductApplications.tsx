"use client";

import { motion } from "framer-motion";
import { Building2, Factory, Home, Layers } from "lucide-react";
import { easePremium, viewportOnce } from "@/lib/animations";

const applicationCategories = [
  {
    title: "Residential Construction",
    description: "Ideal for villas, apartments and modern housing projects.",
    Icon: Home,
  },
  {
    title: "Commercial Buildings",
    description: "Built for offices, retail spaces and business complexes.",
    Icon: Building2,
  },
  {
    title: "Internal Partitions",
    description: "Thin, lightweight walls that maximise usable floor area.",
    Icon: Layers,
  },
  {
    title: "Exterior Walls",
    description: "High-strength walls for exterior and industrial projects.",
    Icon: Factory,
  },
];

/**
 * APPLICATIONS — compact four-category overview with a subtle stagger reveal.
 */
export default function ProductApplications() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-24">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePremium } },
            }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
          >
            Applications
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
            }}
            className="mt-4 text-3xl md:text-4xl font-bold text-[var(--heading)] tracking-tight"
          >
            Built for Every Structure
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {applicationCategories.map(({ title, description, Icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
              }}
            >
              <div className="group h-full flex flex-col p-6 rounded-[22px] border border-[var(--border)] bg-[var(--surface)]/70 dark:bg-[var(--surface)]/60 backdrop-blur-xl shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20">
                  <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--heading)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-text)] leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}