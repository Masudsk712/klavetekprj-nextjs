"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ctaData } from "@/data/home";
import { easePremium, viewportOnce, staggerContainer, staggerContainerFast, staggerItem, fadeUp } from "@/lib/animations";

// Particle component - subtle floating dust
function Particle({ delay, duration, size, x, y }: { delay: number; duration: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated counter hook
function useCounter(end: number, duration: 2000, startCounting: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [startCounting, end, duration]);

  return count;
}

// Magnetic button hook
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * strength);
      y.set(middleY * strength);
    },
    [x, y, strength]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x, y, handleMouse, reset };
}

export default function CinematicCTA() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ken Burns zoom effect - slow cinematic zoom
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1]);

  // Content animations
  const contentY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Green radial glow behind heading
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(750px, 95vh, 1100px)",
        minHeight: "750px",
      }}
    >
      {/* Video Background with Cinematic Zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          poster="/images/hero/hero-poster.webp"
        >
          <source src="/videos/factory-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Green Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(10, 31, 20, 0.4) 0%, rgba(22, 163, 74, 0.3) 50%, rgba(10, 31, 20, 0.5) 100%)"
        }}
      />

      {/* Soft Green Ambient Glow */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ scale: glowScale, opacity: glowOpacity }}
      >
        <div
          className="absolute h-[600px] w-[600px] rounded-full blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(22,163,74,0.4) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <Particle
            key={i}
            delay={i * 0.4}
            duration={6 + (i % 2)}
            size={1.5 + (i % 2)}
            x={`${5 + (i * 17) % 90}%`}
            y={`${10 + (i * 23) % 80}%`}
          />
        ))}
      </div>

      {/* Soft Vignette */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Top Gradient Fade */}
      <div
        className="absolute inset-x-0 top-0 z-50 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--background), transparent)",
        }}
      />

      {/* Bottom Gradient Fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-50 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-60 flex h-full flex-col items-center justify-center px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-[650px] text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easePremium }}
            className="mb-8"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold tracking-widest text-white/90 backdrop-blur-sm">
              READY TO BUILD?
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block text-white">Build Strong.</span>
              <span className="block bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent">
                Build Smarter.
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-10 max-w-[650px] text-base leading-relaxed text-white/85 md:text-lg lg:text-xl"
          >
            {ctaData.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary Button */}
            <MagneticButton strength={0.3}>
              <Link
                href={ctaData.primaryLink}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_rgba(22,163,74,0.4)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_50px_rgba(22,163,74,0.5)]"
              >
                <span className="relative z-10">{ctaData.primaryCta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </MagneticButton>

            {/* Secondary Button */}
            <MagneticButton strength={0.2}>
              <a
                href={ctaData.secondaryLink}
                download="Klavetek-AAC-Blocks-Brochure.pdf"
                aria-label="Download Klavetek brochure"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-white/40 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
              >
                <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span>{ctaData.secondaryCta}</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

// Magnetic Button Component
function MagneticButton({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(y, { damping: 50, stiffness: 100 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * strength);
      y.set(middleY * strength);
    },
    [x, y, strength]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}