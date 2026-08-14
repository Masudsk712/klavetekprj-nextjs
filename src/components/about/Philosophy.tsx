"use client";

import { motion, type Variants } from "framer-motion";
import Container from "@/components/shared/Container";
import { philosophy } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easePremium } },
};

export default function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      {/* Subtle background: factory pattern + abstract green */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/factory-pattern.svg')",
          backgroundSize: "420px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-[120px]" />

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Our Philosophy
            <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.1, duration: 0.85, ease: easePremium }}
            className="mt-7 text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[52px]"
          >
            {philosophy.statement}
          </motion.h2>
        </div>

        {/* Mission / Vision */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
            {[philosophy.mission, philosophy.vision].map((block, i) => (
              <motion.div
                key={block.label}
                variants={reveal}
                className={`relative ${
                  i === 0 ? "md:pr-14" : "md:border-l md:border-[var(--border)] md:pl-14"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary-hover/10 text-primary">
                    {i === 0 ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.9 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10l2.1 2.1m0-14.2l-2.1 2.1m-10 10l-2.1 2.1" />
                      </svg>
                    )}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                    {block.label}
                  </span>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-[var(--body-text)] dark:text-white/85">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* subtle centre divider dot on md+ */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(var(--primary-rgb),0.12)] md:block" />
        </motion.div>
      </Container>
    </section>
  );
}