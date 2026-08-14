"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { BadgeCheck, FileCheck, Building2, X, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/Container";
import { awardsCertifications } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  BadgeCheck,
  FileCheck,
  Building2,
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export default function AwardsCertifications() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const current = awardsCertifications.items[active];
  const CurrentIcon = ICON_MAP[current.icon] ?? BadgeCheck;

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent dark:via-primary/[0.05]" />

      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            Trust &amp; Credibility
            <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.08, duration: 0.75, ease: easePremium }}
            className="mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {awardsCertifications.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.16, duration: 0.7, ease: easePremium }}
            className="mt-5 text-base leading-relaxed text-[var(--muted-text)] dark:text-[var(--muted-text)] md:text-lg"
          >
            {awardsCertifications.subtitle}
                    </motion.p>
        </div>

        {/* ── Main showcase ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Large certification visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easePremium }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-gradient-to-br from-primary/[0.06] to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.18)] lg:col-span-7"
          >
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Open ${current.title} certificate`}
              className="group relative flex aspect-[16/10] w-full cursor-pointer items-center justify-center overflow-hidden p-8 sm:p-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: easePremium }}
                  className="flex w-full items-center justify-center"
                >
                  {current.image ? (
                    <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-64 sm:w-64">
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        sizes="(max-width: 768px) 224px, 256px"
                        quality={90}
                        className="object-contain p-4"
                      />
                    </div>
                  ) : (
                    <span className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CurrentIcon className="h-20 w-20" strokeWidth={1.2} />
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ShieldCheck className="h-4 w-4 text-accent-glow" />
                View details
              </span>
            </button>
          </motion.div>

          {/* Right: details */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-center lg:col-span-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <CurrentIcon className="h-6 w-6" />
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Verified
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: easePremium }}
              >
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[var(--heading)] dark:text-white md:text-3xl">
                  {current.title}
                </h3>
                <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-[var(--muted-text)]">
                  {current.authority}
                </div>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--body-text)] dark:text-white/80">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
                {/* end showcase */}

        {/* ── Horizontal strip ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {awardsCertifications.items.map((item, i) => {
            const StripIcon = ICON_MAP[item.icon] ?? BadgeCheck;
            const isActive = i === active;
            return (
              <motion.button
                key={item.title}
                variants={itemVariants}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={isActive}
                className={`flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-[0_10px_30px_rgba(var(--primary-rgb),0.15)]"
                    : "border-[var(--border)] hover:border-primary/40"
                }`}
              >
                {item.image ? (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1.5">
                    <Image src={item.image} alt="" width={36} height={36} className="h-full w-full object-contain" />
                  </span>
                ) : (
                  <StripIcon className={`h-6 w-6 ${isActive ? "text-primary" : "text-[var(--muted-text)]"}`} />
                )}
                <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-[var(--heading)] dark:text-white"}`}>
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
        {/* end strip */}
      </Container>

      {/* ── Lightbox modal ── */}
      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: easePremium }}
              className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightbox(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex max-h-[80vh] flex-col">
                <div className="flex items-center justify-center bg-gradient-to-b from-white to-slate-100 p-10 sm:p-14">
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={current.title}
                      width={480}
                      height={360}
                      className="max-h-[48vh] w-auto object-contain"
                    />
                  ) : (
                    <CurrentIcon className="h-28 w-28 text-primary" />
                  )}
                </div>
                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-white">{current.title}</h3>
                  <div className="mt-1 text-sm text-accent-glow">{current.authority}</div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                    {current.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
