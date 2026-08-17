"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Container from "@/components/shared/Container";
import { managingDirector } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";

/* ── Component ──────────────────────────────────────────────────────── */

export default function ManagingDirectorSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Restrict transforms/hover to motion-friendly environments.
  const disableMotion = prefersReducedMotion || false;

  // ── Animation variants (respect prefers-reduced-motion) ──
  const contentContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: disableMotion ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easePremium },
    },
  };

  const quoteReveal: Variants = {
    hidden: { opacity: 0, y: disableMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: easePremium },
    },
  };

  // Subtle desktop-only parallax on the ambient glow (pointer: fine, lg+).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), {
    stiffness: 55,
    damping: 18,
  });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), {
    stiffness: 55,
    damping: 18,
  });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (!fine || !wide) return;

    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [prefersReducedMotion, mx, my]);

  const d = managingDirector;

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="relative overflow-hidden bg-[var(--surface)] py-16 md:py-24"
    >
      {/* ── Ambient background / glow (fades in) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.3, ease: easePremium }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute -right-24 top-8 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.13),transparent_65%)] blur-[90px]"
        />
        <div className="absolute -left-28 bottom-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.09),transparent_65%)] blur-[100px]" />
      </motion.div>

      {/* fine top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[45%_55%] lg:gap-14 xl:gap-20">
          {/* ── LEFT: Portrait ── */}
          <motion.div
            initial={disableMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easePremium }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            {/* soft green ambient glow behind image */}
            <div
              className="absolute -inset-5 rounded-[3rem] bg-primary/[0.10] blur-3xl"
              aria-hidden="true"
            />
            {/* offset green architectural frame */}
            <div
              className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-[2.5rem] rounded-br-[5rem] border border-primary/30 sm:block"
              aria-hidden="true"
            />
            {/* thin vertical green accent line */}
            <div
              className="absolute -left-4 top-12 bottom-12 w-px bg-gradient-to-b from-primary/70 via-primary/25 to-transparent"
              aria-hidden="true"
            />

            <div className="group relative overflow-hidden rounded-[28px] rounded-tr-[84px] rounded-bl-[84px] border border-[var(--border)] bg-[var(--secondary-bg)] shadow-premium-lg transition-colors duration-300 dark:border-white/10">
              <div className="relative h-[380px] w-full overflow-hidden sm:h-[480px] lg:h-[560px] xl:h-[620px]">
                {/* portrait — very subtle scale 1.02 on hover */}
                <div
                  className={`absolute inset-0 ${
                    disableMotion
                      ? ""
                      : "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                  }`}
                >
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, (max-width: 1280px) 45vw, 44vw"
                    quality={95}
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                </div>

                {/* very subtle dark gradient for depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                {/* thin architectural grid decoration */}
                <div
                  className="md-arch-grid pointer-events-none absolute inset-0 opacity-[0.12]"
                  aria-hidden="true"
                />

                {/* green ambient inner glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_90px_rgba(22,163,74,0.35)] transition-opacity duration-700 group-hover:opacity-100"
                />

                {/* floating label */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-glow)] shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                    {d.imageLabel}
                  </span>
                </div>

                {/* small KLAVETEK micro-label */}
                <div className="absolute bottom-5 right-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/70">
                  {d.microLabel}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            variants={contentContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative lg:pl-10"
          >
            {/* eyebrow — A MESSAGE FROM OUR MANAGING DIRECTOR */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary"
            >
              <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              {d.label}
            </motion.span>

            {/* name */}
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--heading)] md:text-4xl xl:text-5xl"
            >
              {d.name}
            </motion.h2>

            {/* designation */}
            <motion.p
              variants={fadeUp}
              className="mt-2 text-sm font-semibold text-primary/90 md:text-base"
            >
              {d.designation}
            </motion.p>

            {/* fine divider */}
            <motion.div
              variants={fadeUp}
              className="mt-7 h-px w-full max-w-md bg-gradient-to-r from-primary/40 via-[var(--border)] to-transparent"
            />

            {/* quotation — green vertical accent + small green quote mark */}
            <motion.div variants={quoteReveal} className="relative mt-9 max-w-2xl">
              <div className="relative flex gap-5">
                <span
                  aria-hidden="true"
                  className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-primary/80 via-primary/35 to-primary/10"
                />
                <div className="relative min-w-0">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 -left-1 select-none text-[32px] font-semibold leading-none text-primary/60 md:-top-7 md:text-[40px]"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="relative pt-4 text-xl font-medium leading-[1.55] tracking-tight text-[var(--heading)] dark:text-white/95 md:text-2xl md:leading-[1.5]">
                    {d.quote}
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* message — 3 short paragraphs */}
            <div className="mt-8 max-w-2xl space-y-5">
              {d.message.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={fadeUp}
                  className="text-base leading-relaxed text-[var(--body-text)] dark:text-white/80"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}


