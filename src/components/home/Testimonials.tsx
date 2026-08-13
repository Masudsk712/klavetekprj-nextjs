"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { testimonials } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }> | null>(null);

  useEffect(() => {
    // Generate once on the client only to avoid SSR hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  if (!particles) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            opacity: [0, 0.6, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Premium progress bar component
function ProgressBar({ active, count, duration, isPaused }: { active: number; count: number; duration: number; isPaused: boolean }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset the progress bar whenever the active slide changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, isPaused, duration]);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="relative h-0.5 w-12 md:w-16 bg-[var(--border)] rounded-full overflow-hidden">
          {idx === active && (
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          )}
          {idx < active && (
            <div className="absolute inset-y-0 left-0 w-full bg-primary/50 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = testimonials.items.length;
  const autoplayDuration = 6000;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active, count]);

  // Autoplay
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, autoplayDuration);
    return () => clearInterval(timer);
  }, [next, isInView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Drag state
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[var(--surface)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none dark:via-primary/[0.08]" />

      {/* Animated radial glow behind active card */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        <SectionHeader title={testimonials.title} subtitle={testimonials.subtitle} />

        {/* Carousel container */}
        <div
          className="relative mt-16 md:mt-20 select-none"
          role="region"
          aria-label="Testimonials carousel"
          aria-roledescription="carousel"
        >
          {/* Cards viewport */}
          <div className="relative h-[520px] md:h-[480px] flex items-center justify-center overflow-hidden">
            <motion.div
              ref={dragConstraintsRef}
              className="relative flex items-center justify-center gap-4 md:gap-6 w-full"
              drag="x"
              dragConstraints={dragConstraintsRef}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) {
                  next();
                } else if (info.offset.x > threshold) {
                  prev();
                }
              }}
            >
              {testimonials.items.map((item, index) => {
                const isActive = index === active;
                const isPrev = index === (active - 1 + count) % count;
                const isNext = index === (active + 1) % count;
                const isVisible = isActive || isPrev || isNext;

                // Calculate position and animation variants
                const cardVariants = {
                  active: {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    rotateY: 0,
                    zIndex: 30,
                    filter: "blur(0px)",
                  },
                  prev: {
                    x: "-110%",
                    scale: 0.9,
                    opacity: 0.5,
                    rotateY: 8,
                    zIndex: 10,
                    filter: "blur(2px)",
                  },
                  next: {
                    x: "110%",
                    scale: 0.9,
                    opacity: 0.5,
                    rotateY: -8,
                    zIndex: 10,
                    filter: "blur(2px)",
                  },
                  hidden: {
                    x: direction > 0 ? "100%" : "-100%",
                    scale: 0.85,
                    opacity: 0,
                    rotateY: direction > 0 ? -12 : 12,
                    zIndex: 0,
                    filter: "blur(4px)",
                  },
                };

                const getVariant = () => {
                  if (isActive) return "active";
                  if (isPrev) return "prev";
                  if (isNext) return "next";
                  return "hidden";
                };

                if (!isVisible && !isInView) return null;

                return (
                  <motion.div
                    key={item.name}
                    variants={cardVariants}
                    initial="hidden"
                    animate={getVariant()}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 0.8,
                    }}
                    className={`
                      absolute w-[90%] md:w-[500px] lg:w-[540px]
                      ${isActive ? "cursor-default" : "cursor-pointer"}
                    `}
                    style={{ perspective: 1200 }}
                    onClick={() => !isActive && goTo(index)}
                    role="group"
                    aria-roledescription="slide"
                      aria-label={`Testimonial from ${item.name}`}
                  >
                    {/* Premium glassmorphism card */}
                    <div
                      className="
                        relative p-8 md:p-10 rounded-[24px]
                        bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent
                        dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent
                        backdrop-blur-xl
                        border border-white/20 dark:border-white/10
                        shadow-2xl
                        overflow-hidden
                        group
                        before:absolute before:inset-0 before:rounded-[24px]
                        before:bg-gradient-to-br before:from-primary/[0.15] before:via-transparent before:to-transparent
                        before:opacity-0 before:transition-opacity before:duration-700
                        hover:before:opacity-100
                      "
                    >
                      {/* Green glow effect on hover */}
                      <div
                        className="
                          absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20
                          rounded-[24px] blur-2xl opacity-0 group-hover:opacity-70
                          transition-opacity duration-700 -z-10
                        "
                      />

                      {/* Large quotation mark */}
                      <div className="absolute top-6 right-8 text-[120px] leading-none font-serif text-primary/10 dark:text-primary/15 select-none pointer-events-none">
                        &ldquo;
                      </div>

                      {/* Star rating */}
                      <div className="flex gap-1.5 mb-6 relative z-10">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: isActive ? 0.3 + i * 0.08 : 0,
                              duration: 0.5,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                          >
                            <Star className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(22,163,74,0.5)]" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial quote */}
                      <motion.p
                        className="
                          relative z-10 text-lg md:text-xl leading-relaxed mb-8
                          text-[var(--body-text)] dark:text-[var(--body-text)]
                          italic
                        "
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
                        transition={{ delay: isActive ? 0.4 : 0, duration: 0.7 }}
                      >
                        <span className="text-primary text-3xl font-serif leading-none mr-1">&ldquo;</span>
                        {item.content}
                        <span className="text-primary text-3xl font-serif leading-none ml-1">&rdquo;</span>
                      </motion.p>

                      {/* Divider */}
                      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-6" />

                      {/* User profile section */}
                      <div className="relative z-10 flex items-center gap-4">
                        {/* Avatar with decorative ring */}
                        <div className="relative group/avatar">
                          <div
                            className="
                              absolute -inset-1 bg-gradient-to-br from-primary/40 via-primary/20 to-primary/40
                              rounded-full blur-md group-hover/avatar:blur-lg transition-all duration-500 opacity-70 group-hover/avatar:opacity-100
                            "
                          />
                          <div className="relative h-16 w-16 md:h-18 md:w-18 rounded-full overflow-hidden ring-4 ring-[var(--surface)] dark:ring-[var(--background)] shadow-xl">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover transform group-hover/avatar:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                if (target.parentElement) {
                                  target.parentElement.classList.add(
                                    "bg-primary/10",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "text-primary",
                                    "font-bold",
                                    "text-xl"
                                  );
                                  target.parentElement.textContent = item.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2);
                                }
                              }}
                            />
                          </div>

                          {/* Verified badge */}
                          <div
                            className="
                              absolute -bottom-0.5 -right-0.5 h-7 w-7 bg-primary rounded-full
                              flex items-center justify-center ring-4 ring-[var(--surface)] dark:ring-[var(--background)]
                              shadow-lg
                            "
                          >
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* User details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[var(--heading)] dark:text-white text-base md:text-lg tracking-tight truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[var(--muted-text)] dark:text-[var(--muted-text)] truncate">
                            {item.role}
                          </p>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-medium mt-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Verified Client</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Previous button */}
            <motion.button
              onClick={prev}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex h-12 w-12 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm
                text-[var(--body-text)] shadow-lg
                transition-all duration-300
                hover:bg-primary hover:text-white hover:border-primary
                hover:shadow-[0_0_20px_rgba(22,163,74,0.4)]
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Next button */}
            <motion.button
              onClick={next}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex h-12 w-12 items-center justify-center rounded-full
                border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm
                text-[var(--body-text)] shadow-lg
                transition-all duration-300
                hover:bg-primary hover:text-white hover:border-primary
                hover:shadow-[0_0_20px_rgba(22,163,74,0.4)]
              "
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Premium progress bar */}
          <div className="mt-8 flex justify-center">
            <ProgressBar active={active} count={count} duration={autoplayDuration} isPaused={false} />
          </div>
        </div>
      </div>
    </section>
  );
}