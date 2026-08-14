"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Container from "@/components/shared/Container";
import { journeyTimeline } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Horizontal draw progress across the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent dark:via-primary/[0.05]" />

      <Container>
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Our Story
            <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.08, duration: 0.75, ease: easePremium }}
            className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {journeyTimeline.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.16, duration: 0.7, ease: easePremium }}
            className="mt-5 text-base leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)] md:text-lg"
          >
            {journeyTimeline.subtitle}
          </motion.p>
        </div>

        {/* ─── DESKTOP horizontal timeline ─── */}
        <div className="relative hidden lg:block">
          {/* track line */}
          <div className="absolute left-0 right-0 top-10 h-px -translate-y-1/2 bg-[var(--border)]" />
          {/* animated draw line */}
          <motion.div
            style={{ scaleX: prefersReducedMotion ? 1 : lineProgress }}
            className="absolute left-0 right-0 top-10 h-[3px] -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-primary via-accent-glow to-primary-hover shadow-[0_0_18px_rgba(var(--primary-rgb),0.5)]"
          />

          <div className="grid grid-cols-3 gap-10">
            {journeyTimeline.milestones.map((milestone, i) => (
              <motion.div key={milestone.title} className="relative">
                {/* active dot on the line */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.1 * i, duration: 0.5, type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-1/2 top-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-[var(--surface)] shadow-[0_0_0_5px_rgba(var(--primary-rgb),0.12)]"
                />

                <div className="mt-16">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ delay: 0.1 * i }}
                    className="text-4xl font-bold text-primary"
                  >
                    {milestone.year}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.16 * i, duration: 0.8, ease: easePremium }}
                    className="group mt-6 overflow-hidden rounded-2xl border border-[var(--border)]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={milestone.image}
                        alt={milestone.imageAlt}
                        fill
                        sizes="(max-width: 1280px) 33vw, 400px"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    </div>
                  </motion.div>

                  <motion.h3
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ delay: 0.2 * i }}
                    className="mt-6 text-xl font-semibold text-[var(--heading)] dark:text-white"
                  >
                    {milestone.title}
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ delay: 0.26 * i }}
                    className="mt-3 text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]"
                  >
                    {milestone.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE / TABLET vertical timeline ─── */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-[var(--border)]" />
          <motion.div
            style={{ scaleY: prefersReducedMotion ? 1 : lineProgress }}
            className="absolute bottom-2 left-[11px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-primary via-accent-glow to-primary-hover"
          />
          <div className="space-y-10">
            {journeyTimeline.milestones.map((milestone, i) => (
              <motion.div key={milestone.title} className="relative pl-12">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.08 * i, duration: 0.5, type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-0 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-[var(--surface)] shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.12)]"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.08, duration: 0.7, ease: easePremium }}
                >
                  <div className="text-3xl font-bold text-primary">{milestone.year}</div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)]">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={milestone.image}
                        alt={milestone.imageAlt}
                        fill
                        sizes="100vw"
                        quality={88}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--heading)] dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)]">
                    {milestone.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

