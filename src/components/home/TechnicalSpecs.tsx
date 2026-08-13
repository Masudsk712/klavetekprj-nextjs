"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { technicalSpecs } from "@/data/home";
import { easePremium, easeInOut, viewportOnce } from "@/lib/animations";
import { 
  Shield, CheckCircle
} from "lucide-react";

const ITEMS_PER_SLIDE = 4;
const AUTO_SLIDE_INTERVAL = 5000;

const rowVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easeInOut,
    },
  }),
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 30 : -30,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  }),
};

export default function TechnicalSpecs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isTouchingRef = useRef(false);

  const totalSlides = useMemo(() => Math.ceil(technicalSpecs.specs.length / ITEMS_PER_SLIDE), []);
  const currentSpecs = useMemo(() => technicalSpecs.specs.slice(
    currentSlide * ITEMS_PER_SLIDE,
    (currentSlide + 1) * ITEMS_PER_SLIDE
  ), [currentSlide]);

  const animateProgressRef = useRef<(time: number) => void>(() => {});

  const animateProgress = useCallback((time: number) => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = time;
    }
    const elapsed = time - startTimeRef.current;
    progressRef.current = Math.min(elapsed / AUTO_SLIDE_INTERVAL, 1);
    setProgress(progressRef.current);

    if (progressRef.current < 1) {
      rafRef.current = requestAnimationFrame(animateProgressRef.current);
    }
  }, []);

  // Keep the ref in sync so the recursive animation references the latest callback
  useEffect(() => {
    animateProgressRef.current = animateProgress;
  }, [animateProgress]);

  useEffect(() => {
    if (!isPaused && !isTouchingRef.current && totalSlides > 1) {
      startTimeRef.current = 0;
      progressRef.current = 0;
      setProgress(0);
      
      rafRef.current = requestAnimationFrame(animateProgress);
      
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, AUTO_SLIDE_INTERVAL);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        startTimeRef.current = 0;
      };
    }
  }, [isPaused, totalSlides, animateProgress]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    
    // Reset progress and timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    startTimeRef.current = 0;
    progressRef.current = 0;
    setProgress(0);
  };

  const handleTouchStart = () => {
    isTouchingRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    startTimeRef.current = 0;
    progressRef.current = 0;
    setProgress(0);
  };

  return (
    <section 
      className="relative py-20 md:py-28 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

      {/* Decorative glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none dark:bg-primary/15" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none dark:bg-primary/12" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
        {/* Section Header with Premium Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easePremium }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-4 py-2 rounded-full">
              Performance Metrics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--heading)] mb-4">
            {technicalSpecs.title}
          </h2>
          <p className="text-lg text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
            {technicalSpecs.subtitle}
          </p>
        </motion.div>

        {/* Premium Specs Table - Auto Transitioning */}
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative">
            {/* Table Header - Always visible, fixed */}
            <div className="bg-gradient-to-r from-primary to-primary-hover rounded-t-lg p-4">
              <div className="grid grid-cols-12 gap-4 text-white font-bold text-sm uppercase tracking-wider">
                <div className="col-span-4 md:col-span-5">Property</div>
                <div className="col-span-2 md:col-span-2 text-center">Units</div>
                <div className="col-span-3 md:col-span-3 text-center">Values</div>
                <div className="col-span-3 md:col-span-2 text-center hidden md:block">Standard</div>
              </div>
            </div>

            {/* Table Body - Animates content transitions */}
            <div className="bg-[var(--surface)] border border-[var(--border)] border-t-0 rounded-b-lg overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {currentSpecs.map((spec, index) => (
                    <motion.div
                      key={spec.parameter}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className="spec-row grid grid-cols-12 gap-4 p-4 items-center hover:bg-[var(--color-table-hover)]"
                    >
                      {/* Property Name */}
                      <div className="col-span-4 md:col-span-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                            <Shield className="w-5 h-5 text-primary" strokeWidth={2.5} />
                          </div>
                          <span className="font-semibold text-[var(--heading)] text-sm md:text-base">
                            {spec.parameter}
                          </span>
                        </div>
                      </div>

                      {/* Units */}
                      <div className="col-span-2 md:col-span-2 text-center">
                        <span className="text-xs md:text-sm text-[var(--muted-text)] font-medium">
                          {spec.unit}
                        </span>
                      </div>

                      {/* Values */}
                      <div className="col-span-3 md:col-span-3 text-center">
                        <span className="text-base md:text-lg font-black text-[var(--heading)]">
                          {spec.value}
                        </span>
                      </div>

                      {/* Standard Badge */}
                      <div className="col-span-3 md:col-span-2 text-center hidden md:block">
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                          <CheckCircle className="w-3 h-3" />
                          <span className="truncate">{spec.standard}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Navigation Dots with Progress */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full transition-all duration-300 bg-[var(--border)] group-hover:bg-primary/60">
                    {currentSlide === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-xs font-medium text-[var(--muted-text)]">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 text-sm text-[var(--muted-text)]">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All specifications tested and certified by third-party laboratories
          </div>
        </motion.div>
      </div>
    </section>
  );
}
