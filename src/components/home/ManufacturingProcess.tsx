"use client";

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { manufacturingProcess } from "@/data/home";
import { easePremium, viewportOnce } from "@/lib/animations";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";

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

const stepImages: Record<string, string> = {
  Box: "/images/process/raw-material.webp",
  Mixer: "/images/process/mixing.webp",
  Mold: "/images/process/Casting.webp",
  CuttingMachine: "/images/process/Cutting.webp",
  SteamPressure: "/images/process/Autoclaving.webp",
  ShieldCheck: "/images/process/QualityCheck.webp",
  WaterDrop: "/images/process/Curing.webp",
  Truck: "/images/process/Delivery.webp",
};

// ─── Reduced Motion Check ────────────────────────────────────

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Render empty div on server to match server-rendered HTML
  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
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

// ─── Mouse Glow Effect ───────────────────────────────────────

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
      style={{
        x: glowX,
        y: glowY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

// ─── Premium Story Card ──────────────────────────────────────

const PremiumStoryCard = ({
  step,
  index,
  isRevealed,
  isActive,
  imageOnLeft,
}: {
  step: any;
  index: number;
  isRevealed: boolean;
  isActive: boolean;
  imageOnLeft: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Ken Burns effect
  const kenBurnsScale = useMotionValue(1);
  
  useEffect(() => {
    if (prefersReducedMotion || !isActive) return;
    
    const interval = setInterval(() => {
      kenBurnsScale.set(1.05 + Math.random() * 0.05);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isActive, kenBurnsScale]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={{
        opacity: isRevealed ? 1 : 0,
        y: isRevealed ? 0 : 40,
      }}
      transition={{
        duration: 1,
        ease: easePremium,
      }}
      className={`relative min-h-[60vh] flex items-center ${
        imageOnLeft ? "" : "flex-row-reverse"
      }`}
    >
      {/* Background Glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: easePremium }}
            className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: imageOnLeft ? -100 : 100 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : (imageOnLeft ? -50 : 50),
        }}
        transition={{ duration: 1.2, ease: easePremium }}
        className="relative w-full lg:w-[55%] h-[40vh] lg:h-[55vh] p-3 lg:p-6"
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isActive ? 1.05 : 1,
            }}
            transition={{
              duration: 20,
              ease: "linear",
            }}
            style={{ scale: kenBurnsScale }}
          >
            <Image
              src={stepImages[step.icon] || "/images/hero/hero-poster.webp"}
              alt={step.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-all duration-1000 ${
                imageLoaded ? "opacity-100 brightness-100" : "opacity-0 brightness-75"
              } ${isActive ? "brightness-110" : ""}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Border Glow */}
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0.5,
            }}
            className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none"
          />

          {/* Image Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: imageOnLeft ? 100 : -100 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : (imageOnLeft ? 50 : -50),
        }}
        transition={{ duration: 1.2, delay: 0.2, ease: easePremium }}
        className="relative w-full lg:w-[45%] p-4 lg:p-8 flex flex-col justify-center"
      >
        {/* Step Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-md" />
            <div className="relative w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-sm font-bold text-primary tracking-[0.3em]">
            STEP {step.step}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight"
        >
          {step.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
        >
          {step.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {step.highlights.map((highlight: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-xs font-medium text-gray-900 dark:text-gray-100"
            >
              {highlight}
            </motion.div>
          ))}
        </motion.div>

        {/* Process Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {step.processTime}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[120px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center text-primary"
        >
          {iconMap[step.icon]}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─── Section Divider ─────────────────────────────────────────

const SectionDivider = () => (
  <div className="relative h-24 w-full overflow-hidden">
    <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    <motion.div
      className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
      animate={{
        scaleX: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "center" }}
    />
  </div>
);

// ─── Final Success Section ───────────────────────────────────

const FinalSuccessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const qualityBadges = [
    "BIS Certified",
    "ISO 9001",
    "Premium Quality",
    "Eco-Friendly",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
      transition={{ duration: 1.2, ease: easePremium }}
      className="relative mt-24 lg:mt-32"
    >
      <FloatingParticles />
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        {/* Glass Container */}
        <div className="relative rounded-[28px] overflow-hidden bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isInView ? 1 : 0, rotate: isInView ? 0 : -180 }}
              transition={{ duration: 1.2, delay: 0.2, ease: easePremium }}
             className="flex justify-center mb-2 sm:mb-3"
            >
             <div className="relative">
               {/* Pulsing Glow */}
               <motion.div
                 animate={{
                   scale: [1, 1.5, 1],
                   opacity: [0.4, 0.7, 0.4],
                 }}
                 transition={{
                   duration: 3,
                   repeat: Infinity,
                   ease: "easeInOut",
                 }}
               className="absolute inset-0 bg-primary/60 rounded-full blur-2xl"
               />
               
               {/* Icon Container */}
                <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md shadow-primary/60">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight"
            >
              Manufacturing Excellence
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xs text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-2 tracking-tight"
            >
              {manufacturingProcess.bottomStatement}
            </motion.p>

            {/* Quality Badges */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.7,
                  },
                },
              }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              {qualityBadges.map((badge, i) => (
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
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <div className="relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white/95 dark:bg-white/15 backdrop-blur-xl border border-white/50 dark:border-white/25 shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white tracking-tight">
                        {badge}
                      </span>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                </motion.div>
              ))}
            </motion.div>

            {/* Process Time Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.2 }}
               className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set([0]));
  const activeStepRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  const prefersReducedMotion = useReducedMotion();

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-based active step tracking (more reliable than IntersectionObserver)
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll("[data-step-index]");
      const cardArray = Array.from(cards);
      let maxIdx = activeStepRef.current;
      const windowHeight = window.innerHeight;

      cardArray.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Check if card is in viewport (at least partially visible)
        if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
          const idx = parseInt(card.getAttribute("data-step-index") || "0");
          if (idx > maxIdx) {
            maxIdx = idx;
          }
        }
      });

      if (maxIdx !== activeStepRef.current) {
        activeStepRef.current = maxIdx;
        setActiveStep(maxIdx);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Keep ref in sync
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  const steps = manufacturingProcess.steps;

  // Reveal all steps so they render properly
  const derivedRevealedSteps = useMemo(() => {
    const set = new Set<number>();
    steps.forEach((_, idx) => set.add(idx));
    return set;
  }, [steps]);

  // ─── Mobile Layout ──────────────────────────────────────────
  const MobileLayout = () => (
    <div className="relative max-w-2xl mx-auto px-4">
      <div className="flex flex-col gap-16">
        {steps.map((step, idx) => {
          const isRevealed = derivedRevealedSteps.has(idx);
          const isActive = activeStep === idx && isRevealed;

          return (
            <div
              key={step.step}
              data-step-index={idx}
              className="relative"
            >
              <PremiumStoryCard
                step={step}
                index={idx}
                isRevealed={isRevealed}
                isActive={isActive}
                imageOnLeft={idx % 2 === 0}
              />
              {/* Mobile Divider */}
              {idx < steps.length - 1 && <SectionDivider />}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── Desktop Layout ─────────────────────────────────────────
  const DesktopLayout = () => (
    <div className="relative max-w-7xl mx-auto">
      {steps.map((step, idx) => {
        const isRevealed = derivedRevealedSteps.has(idx);
        const isActive = activeStep === idx && isRevealed;
        const imageOnLeft = idx % 2 === 0;

        return (
          <div
            key={step.step}
            data-step-index={idx}
            className="relative"
          >
            <PremiumStoryCard
              step={step}
              index={idx}
              isRevealed={isRevealed}
              isActive={isActive}
              imageOnLeft={imageOnLeft}
            />
            {/* Desktop Divider */}
            {idx < steps.length - 1 && <SectionDivider />}
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Premium radial green glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* ─── Section Header ─────────────────────────────── */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
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

        {/* ─── Manufacturing Stages ───────────────────────── */}
        {isMobile ? <MobileLayout /> : <DesktopLayout />}

        {/* ─── Final Success Section ─────────────────────── */}
        <FinalSuccessSection />
      </div>
    </section>
  );
}