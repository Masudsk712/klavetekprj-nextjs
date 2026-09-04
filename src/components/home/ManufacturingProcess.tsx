"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { manufacturingProcess } from "@/data/home";
import { easePremium, viewportOnce } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";

interface ManufacturingStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  processTime: string;
  image?: string;
  imageAlt?: string;
}

// Decorative particles generated once at module load (only rendered after mount)
const FLOATING_PARTICLES = [...Array(15)].map((_, i) => ({
  id: i,
  x: Math.random() * 100 - 50,
  y: Math.random() * -100 - 50,
  duration: 4 + Math.random() * 3,
  delay: Math.random() * 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

// ─── Manufacturing Step Icons ────────────────────────────────

const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconMixer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 8a4 4 0 0 0-4 4" />
  </svg>
);

const IconMold = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M4 10h16" />
    <path d="M12 6v12" />
  </svg>
);

const IconCuttingMachine = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M6 12h12" strokeDasharray="2 2" />
    <path d="M4 8l-2 4 2 4" />
    <path d="M20 8l2 4-2 4" />
  </svg>
);

const IconSteamPressure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2c0 4-3 6-3 10a3 3 0 0 0 6 0c0-4-3-6-3-10z" />
    <path d="M9 14c0 2 1.5 3 3 3s3-1 3-3" />
    <path d="M12 18v4" />
  </svg>
);

const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconWaterDrop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="1" y="8" width="15" height="8" rx="1" />
    <path d="M16 8h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3" />
    <circle cx="5.5" cy="17.5" r="2" />
    <circle cx="18.5" cy="17.5" r="2" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  Box: <IconBox />,
  Mixer: <IconMixer />,
  Mold: <IconMold />,
  CuttingMachine: <IconCuttingMachine />,
  SteamPressure: <IconSteamPressure />,
  ShieldCheck: <IconShieldCheck />,
  WaterDrop: <IconWaterDrop />,
  Truck: <IconTruck />,
};

// Real factory photos from /images/gallery/ — one per manufacturing stage.
// The same mapping lives per-step in src/data/home.ts; this fallback keeps
// the section resilient if a step is ever added without an image.
const stepImages: Record<string, string> = {
  Box: "/images/gallery/raw-material.webp",
  Mixer: "/images/gallery/mixing.webp",
  Mold: "/images/gallery/casting.webp",
  CuttingMachine: "/images/gallery/cutting_1.webp",
  SteamPressure: "/images/gallery/AutoclaveMachine.webp",
  ShieldCheck: "/images/gallery/LabRoom.webp",
  WaterDrop: "/images/gallery/curing_1.webp",
  Truck: "/images/gallery/delivery_1.webp",
};

const stepImage = (step: ManufacturingStep): string =>
  step.image || stepImages[step.icon] || "/images/gallery/gallery-hero.webp";

// ─── Reduced Motion Check ────────────────────────────────────

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Read the initial match once on mount; the listener keeps it in sync afterwards.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

// ─── Floating Particles ──────────────────────────────────────

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Hydration guard: only render the animated particles after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Render empty div on server to match server-rendered HTML
  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Timeline Step ───────────────────────────────────────────

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.15 },
  },
};

interface TimelineStepProps {
  step: ManufacturingStep;
  index: number;
  total: number;
  prefersReducedMotion: boolean;
}

const TimelineStep = ({ step, index, total, prefersReducedMotion }: TimelineStepProps) => {
  // Desktop: even steps place the card left of the connector line, odd steps
  // right — a classic alternating timeline. Mobile stacks everything.
  const cardOnLeft = index % 2 === 0;
  const isLast = index === total - 1;

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] lg:gap-0 ${
        isLast ? "" : "pb-14 md:pb-20"
      }`}
    >
      {/* Node on the connector line */}
      <motion.div
        variants={nodeVariants}
        className="relative z-10 col-start-1 row-start-1 justify-self-start lg:col-start-2 lg:row-start-1 lg:justify-self-center lg:self-center"
      >
        <div className="relative flex items-center justify-center">
          {!prefersReducedMotion && (
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0.12, 0.45] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-primary/40 blur-md"
              aria-hidden="true"
            />
          )}
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover border-4 border-[var(--background)] shadow-lg shadow-primary/40 flex items-center justify-center text-white">
            <span className="lg:scale-125">{iconMap[step.icon]}</span>
          </div>
        </div>
      </motion.div>

      {/* Step card — image + content, alternating sides on desktop */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`col-start-2 col-end-3 row-start-1 lg:row-start-1 min-w-0 ${
          cardOnLeft ? "lg:col-start-1" : "lg:col-start-3"
        }`}
      >
        <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/25 bg-[var(--surface)] dark:bg-white/[0.06] shadow-[0_24px_70px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(22,163,74,0.18)]">
          {/* Image */}
          <div className="relative h-52 md:h-64 lg:h-60 xl:h-72 overflow-hidden">
            <Image
              src={stepImage(step)}
              alt={step.imageAlt || step.title}
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {step.processTime}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 md:p-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs md:text-sm font-bold text-primary tracking-[0.25em] uppercase">
                Step {step.step}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-bold text-[var(--heading)] dark:text-white mb-3 tracking-tight leading-tight">
              {step.title}
            </h3>

            <p className="text-sm md:text-base text-[var(--body-text)] dark:text-[var(--muted-text)] leading-relaxed mb-5">
              {step.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {step.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-xs font-medium text-[var(--heading)] dark:text-gray-100"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ghost step number filling the empty desktop column */}
      <div
        aria-hidden="true"
        className={`hidden lg:flex row-start-1 items-center ${
          cardOnLeft ? "col-start-3 justify-start pl-10" : "col-start-1 justify-end pr-10"
        }`}
      >
        <span
          className="text-[7rem] xl:text-[9rem] font-extrabold leading-none select-none text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(22, 163, 74, 0.16)" }}
        >
          {step.step}
        </span>
      </div>
    </motion.div>
  );
};

// ─── Final Success Section ───────────────────────────────────

const FinalSuccessSection = () => {
  const qualityBadges = ["BIS Certified", "ISO 9001", "Premium Quality", "Eco-Friendly"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: easePremium }}
      className="relative mt-20 lg:mt-28"
    >
      <FloatingParticles />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl md:max-w-5xl mx-auto">
        {/* Glass Container */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative px-4 py-8 sm:px-6 lg:px-10 lg:py-10 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, delay: 0.2, ease: easePremium }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary/60 rounded-full blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md shadow-primary/60">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-bold text-[var(--heading)] dark:text-white mb-2 tracking-tight">
              Manufacturing Excellence
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-[var(--body-text)] dark:text-[var(--muted-text)] max-w-xl mx-auto leading-relaxed mb-6">
              {manufacturingProcess.bottomStatement}
            </p>

            {/* Quality Badges */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
              }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              {qualityBadges.map((badge) => (
                <motion.div
                  key={badge}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: easePremium },
                    },
                  }}
                  className="relative group"
                >
                  {/* Glow Border */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                  {/* Badge */}
                  <div className="relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white/95 dark:bg-white/15 backdrop-blur-xl border border-white/50 dark:border-white/25 shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base font-semibold text-[var(--heading)] dark:text-white whitespace-nowrap">
                        {badge}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Complete process duration */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.6, ease: easePremium }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold text-[var(--heading)] dark:text-white">
                Complete Process: {manufacturingProcess.processTime}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ──────────────────────────────────────────

export default function ManufacturingProcess() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked connector-line progress: the line fills as the visitor
  // travels through the manufacturing stages.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  const steps = manufacturingProcess.steps;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Premium radial green glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Soft gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* ─── Section Header ─────────────────────────────── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easePremium }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-5">
              Manufacturing Excellence
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easePremium }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--heading)] dark:text-white mb-5 tracking-tight"
          >
            From Raw Material to{" "}
            <span className="bg-gradient-to-r from-primary via-accent-glow to-primary bg-clip-text text-transparent">
              Premium AAC Blocks
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium }}
            className="text-base md:text-lg text-[var(--body-text)] dark:text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed"
          >
            {manufacturingProcess.subtitle}
          </motion.p>
        </div>

        {/* ─── Animated Timeline ──────────────────────────── */}
        <div ref={timelineRef} className="relative">
          {/* Connector track + scroll-linked progress fill */}
          <div
            aria-hidden="true"
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-[3px] rounded-full bg-[var(--border)] dark:bg-white/10 overflow-hidden"
          >
            <motion.div
              style={{ scaleY: prefersReducedMotion ? 1 : lineScale, transformOrigin: "top" }}
              className="absolute inset-0 rounded-full bg-gradient-to-b from-primary via-accent-glow to-primary"
            />
          </div>

          {steps.map((step, index) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={index}
              total={steps.length}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* ─── Final Success Section ──────────────────────── */}
        <FinalSuccessSection />
      </div>
    </section>
  );
}