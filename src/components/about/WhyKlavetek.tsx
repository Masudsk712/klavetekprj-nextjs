"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Award, Cpu, Leaf, Truck, Users } from "lucide-react";
import Container from "@/components/shared/Container";
import { whyKlavetek } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Cpu,
  Leaf,
  Truck,
  Users,
};

export default function WhyKlavetek() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const current = whyKlavetek.items[active];
  const ActiveIcon = ICON_MAP[current.icon] ?? Award;

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent dark:via-primary/[0.05]" />

      <Container>
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            The Difference
            <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.08, duration: 0.75, ease: easePremium }}
            className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {whyKlavetek.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.16, duration: 0.7, ease: easePremium }}
            className="mt-5 text-base leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)] md:text-lg"
          >
            {whyKlavetek.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ── LEFT: large feature image ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easePremium }}
            className="relative order-2 lg:order-1"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-radial from-primary/18 to-transparent blur-[70px] dark:from-primary/22" />
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: easePremium }}
                  className="relative aspect-[4/3] w-full"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  {/* number + icon overlay */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md">
                      <ActiveIcon className="h-6 w-6 text-accent-glow" />
                    </span>
                    <span className="text-2xl font-bold text-white/90">{current.number}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── RIGHT: vertical selectable list ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-1 lg:order-2"
          >
            <div className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {whyKlavetek.items.map((item, i) => {
                const ItemIcon = ICON_MAP[item.icon] ?? Award;
                const isActive = i === active;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`group relative flex items-start gap-5 px-2 py-6 text-left transition-colors duration-300 sm:px-4 ${
                      isActive ? "bg-primary/[0.04]" : "hover:bg-primary/[0.025]"
                    }`}
                  >
                    {/* left accent bar */}
                    <span
                      className={`absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-primary to-accent-glow transition-all duration-500 ${
                        isActive ? "h-3/4" : "h-0"
                      }`}
                    />
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-[var(--border)] text-[var(--muted-text)] group-hover:text-primary"
                      }`}
                    >
                      <ItemIcon className="h-6 w-6" />
                    </span>
                    <span className="pt-1">
                      <span
                        className={`block text-xs font-semibold tracking-widest ${
                          isActive ? "text-primary" : "text-[var(--muted-text)]"
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="mt-1 block text-lg font-semibold text-[var(--heading)] dark:text-white">
                        {item.title}
                      </span>
                      <span
                        className={`mt-2 block max-w-md text-sm leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-[var(--body-text)] dark:text-white/80" : "text-[var(--muted-text)]"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
