"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { manufacturingProcess } from "@/data/home";
import { easePremium, viewportOnce } from "@/lib/animations";
import { useRef, useState, useEffect } from "react";

// ─── Manufacturing Step Icons ────────────────────────────────

const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconMixer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 8a4 4 0 0 0-4 4" />
  </svg>
);

const IconMold = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M4 10h16" />
    <path d="M12 6v12" />
  </svg>
);

const IconCuttingMachine = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M6 12h12" strokeDasharray="2 2" />
    <path d="M4 8l-2 4 2 4" />
    <path d="M20 8l2 4-2 4" />
  </svg>
);

const IconSteamPressure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2c0 4-3 6-3 10a3 3 0 0 0 6 0c0-4-3-6-3-10z" />
    <path d="M9 14c0 2 1.5 3 3 3s3-1 3-3" />
    <path d="M12 18v4" />
  </svg>
);

const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconWaterDrop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
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

const stepImages: Record<string, string> = {
  Box: "/images/hero/hero-poster.webp",
  Mixer: "/images/features/sustainable-manufacturing.webp",
  Mold: "/images/features/faster-construction.webp",
  CuttingMachine: "/images/features/quality-inspection.webp",
  SteamPressure: "/images/features/fire-resistant.webp",
  ShieldCheck: "/images/features/quality-inspection.webp",
  WaterDrop: "/images/features/thermal-efficiency.webp",
  Truck: "/images/features/sound-insulation.webp",
};

// ─── Main Component ──────────────────────────────────────────

export default function ManufacturingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-step-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-step-index") || "0");
            setRevealedSteps((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15, rootMargin: "-60px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const steps = manufacturingProcess.steps;
  const leftSteps = steps.filter((_, i) => i % 2 === 0);
  const rightSteps = steps.filter((_, i) => i % 2 === 1);

  // ─── Background ──────────────────────────────────────────────
  const Background = () => (
    <>
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
    </>
  );

  // ─── Single Step Card ────────────────────────────────────────
  const StepCard = ({
    step,
    index,
    globalIndex,
  }: {
    step: (typeof steps)[0];
    index: number;
    globalIndex: number;
  }) => {
    const imageUrl = stepImages[step.icon] || "/images/hero/hero-poster.webp";
    const isRevealed = revealedSteps.has(globalIndex);

    return (
      <motion.div
        data-step-index={globalIndex}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isRevealed ? 1 : 0.5,
          y: isRevealed ? 0 : 20,
        }}
        transition={{
          duration: 0.9,
          ease: easePremium,
          delay: globalIndex * 0.08,
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.4, ease: easePremium },
        }}
        className="group relative w-[92%] max-w-[420px] mx-auto rounded-[24px] overflow-hidden border border-green-500/25 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-green-lg transition-all duration-500"
      >
        {/* Image - 16:9 */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={step.title}
            fill
            sizes="(max-width: 1024px) 92vw, 420px"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Step badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: isRevealed ? 1 : 0.6,
              scale: 1,
            }}
            transition={{ duration: 0.5, delay: globalIndex * 0.08 + 0.2 }}
            className="absolute top-3 left-3 z-20"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 dark:bg-black/60 backdrop-blur-md border border-primary/40 shadow-lg">
              <span className="text-[11px] font-bold text-primary tracking-widest">
                STEP {step.step}
              </span>
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{
              opacity: isRevealed ? 1 : 0.7,
              rotate: 0,
            }}
            transition={{ duration: 0.6, delay: globalIndex * 0.08 + 0.3, ease: easePremium }}
            className="absolute bottom-3 right-3 z-20"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg">
              {iconMap[step.icon]}
            </div>
          </motion.div>

          {/* Ken Burns zoom overlay */}
          <motion.div
            className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
            {step.description}
          </p>
        </div>

        {/* Green glow on hover */}
        <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none shadow-[inset_0_0_50px_rgba(22,163,74,0.12)]" />
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <Background />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ─── Section Header ─────────────────────────────── */}
        <div className="text-center mb-14 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
            }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-5">
              Manufacturing Excellence
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight"
          >
            From Raw Material to{" "}
            <span className="bg-gradient-to-r from-primary via-accent-glow to-primary bg-clip-text text-transparent">
              Premium AAC Blocks
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
            }}
            className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {manufacturingProcess.subtitle}
          </motion.p>
        </div>

        {/* ─── Mobile: Single Column Timeline ────────────── */}
        {isMobile && (
          <div className="relative">
            {/* Mobile vertical timeline */}
            <div className="absolute left-[22px] top-2 bottom-2 w-[2px] z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>

            <div className="flex flex-col items-center gap-10">
              {steps.map((step, idx) => (
                <div key={step.step} className="relative w-full flex items-center">
                  {/* Dot on timeline */}
                  <div className="absolute left-[22px] -translate-x-1/2 z-10">
                    {revealedSteps.has(idx) ? (
                      <motion.div
                        className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary-hover shadow-[0_0_16px_rgba(22,163,74,0.7)]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: easePremium }}
                      >
                        <div className="absolute inset-1 rounded-full bg-white/80" />
                      </motion.div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-500 shadow-md" />
                    )}
                  </div>

                  {/* Card - offset to make room for timeline */}
                  <div className="ml-12 flex-1">
                    <StepCard step={step} index={idx} globalIndex={idx} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Desktop: Two-Column Timeline ──────────────── */}
        {!isMobile && (
          <div className="relative max-w-6xl mx-auto">
            {/* Center timeline line with scroll-based drawing */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] z-0">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-primary/25 blur-md dark:block hidden" />
              {/* Animated line that draws on scroll */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-2 gap-x-12 lg:gap-x-16">
              {/* Left Column - even steps */}
              <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                {leftSteps.map((step, i) => {
                  const globalIndex = i * 2;
                  return (
                    <div key={step.step} className="relative flex flex-col items-center">
                      {/* Step card */}
                      <StepCard step={step} index={i} globalIndex={globalIndex} />

                      {/* Center dot */}
                      <div className="absolute right-0 translate-x-[calc(50%+12px)] top-1/2 -translate-y-1/2 z-10">
                        {revealedSteps.has(globalIndex) && (
                          <motion.div
                            className="absolute -inset-4 rounded-full bg-primary/20"
                            animate={{
                              scale: [1, 1.6, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <div
                          className={`relative w-5 h-5 rounded-full z-10 ${
                            revealedSteps.has(globalIndex)
                              ? "bg-gradient-to-br from-primary to-primary-hover shadow-[0_0_22px_rgba(22,163,74,0.8)]"
                              : "bg-gray-400 dark:bg-gray-500"
                          }`}
                        >
                          <div className="absolute inset-1 rounded-full bg-white/80 dark:bg-white/90" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - odd steps */}
              <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                {rightSteps.map((step, i) => {
                  const globalIndex = i * 2 + 1;
                  return (
                    <div key={step.step} className="relative flex flex-col items-center">
                      {/* Step card */}
                      <StepCard step={step} index={i} globalIndex={globalIndex} />

                      {/* Center dot */}
                      <div className="absolute left-0 -translate-x-[calc(50%+12px)] top-1/2 -translate-y-1/2 z-10">
                        {revealedSteps.has(globalIndex) && (
                          <motion.div
                            className="absolute -inset-4 rounded-full bg-primary/20"
                            animate={{
                              scale: [1, 1.6, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <div
                          className={`relative w-5 h-5 rounded-full z-10 ${
                            revealedSteps.has(globalIndex)
                              ? "bg-gradient-to-br from-primary to-primary-hover shadow-[0_0_22px_rgba(22,163,74,0.8)]"
                              : "bg-gray-400 dark:bg-gray-500"
                          }`}
                        >
                          <div className="absolute inset-1 rounded-full bg-white/80 dark:bg-white/90" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Bottom CTA ───────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
          }}
          className="mt-20 md:mt-28"
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative p-[2px] rounded-full bg-gradient-to-r from-primary/40 via-primary/25 to-primary/40">
                <div className="px-7 py-2.5 rounded-full bg-black/50 dark:bg-black/60 backdrop-blur-sm">
                  <span className="text-[13px] font-bold text-primary tracking-widest uppercase">
                    Manufacturing Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Quality icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-primary/15 dark:bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/15">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              {manufacturingProcess.bottomStatement}
            </p>

            {/* Quality badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {[
                "Made with Precision",
                "Tested for Quality",
                "Delivered with Confidence",
              ].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: easePremium }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.07] dark:bg-primary/10 border border-primary/15 dark:border-primary/20"
                >
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}