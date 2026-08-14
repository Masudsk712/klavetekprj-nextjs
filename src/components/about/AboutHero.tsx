"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { aboutHero } from "@/data/about";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setVideoReady(true);
    const onError = () => setVideoError(true);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onError);
    };
  }, []);

  // Subtle scroll-linked parallax / fade on the foreground content
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const showPoster = !videoReady || videoError;

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px]"
    >
      {/* ─── Cinematic background ─── */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Poster fallback */}
        {showPoster && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${aboutHero.poster}')` }}
            animate={prefersReducedMotion ? undefined : { scale: [1.08, 1] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          />
        )}

        {/* Video background */}
        {!videoError && (
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 30%", filter: "saturate(1.08) contrast(1.04)" }}
            animate={prefersReducedMotion ? undefined : { scale: [1.02, 1, 1.02] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <source src={aboutHero.video} type="video/mp4" />
          </motion.video>
        )}

        {/* Subtle dark overlay — kept light so the image stays visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/45" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.6)" }}
        />

        {/* Soft green ambient accents */}
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent-glow/10 blur-3xl pointer-events-none" />
      </div>

      {/* ─── Foreground content ─── */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex min-h-[calc(100vh-90px)] items-center md:min-h-[calc(100vh-110px)]"
      >
        <Container>
          <div className="max-w-[720px] py-16 md:py-20">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-glow"
            >
              <span className="h-px w-10 bg-gradient-to-r from-accent-glow to-transparent" />
              {aboutHero.eyebrow}
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
              className="mt-7 text-[44px] font-semibold leading-[1.06] tracking-tight text-white md:text-[56px] lg:text-[66px]"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.55)" }}
            >
              {aboutHero.titleLine}
              <span className="block bg-gradient-to-r from-primary via-accent-glow to-primary-hover bg-clip-text text-transparent">
                {aboutHero.titleAccent}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
              className="mt-7 max-w-[520px] text-base leading-[1.75] text-white/90 md:text-lg"
            >
              {aboutHero.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
              className="mt-10"
            >
              <Link
                href={aboutHero.ctaHref}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-hover px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(22,163,74,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_20px_55px_rgba(22,163,74,0.5)]"
              >
                <span className="relative z-10">{aboutHero.cta}</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, 6, 0] }}
        transition={{
          delay: 1.4,
          repeat: prefersReducedMotion ? 0 : Infinity,
          duration: 2.2,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
          {aboutHero.scrollLabel}
        </span>
        <div className="relative h-9 w-5 rounded-full border border-white/60">
          <motion.span
            animate={
              prefersReducedMotion
                ? { opacity: 0.6 }
                : { y: [0, 12, 0], opacity: [0, 1, 0] }
            }
            transition={{ delay: 1.5, repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute left-1/2 top-1 h-2 w-1 -translate-x-1/2 rounded-full bg-accent-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}

