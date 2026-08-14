"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { impactStats } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent dark:via-primary/[0.05]" />

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easePremium }}
          className="mb-2 text-center text-[var(--muted-text)]"
        >
          {impactStats.title}
        </motion.h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {impactStats.stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold leading-none tracking-tight text-primary sm:text-5xl md:text-6xl">
                <AnimatedCounter value={stat.value} duration={2.4} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted-text)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
