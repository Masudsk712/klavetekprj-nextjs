"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { aboutPreview } from "@/data/home";
import { easePremium } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Assets                                                             */
/* ------------------------------------------------------------------ */

// Transparent elephant + AAC block product visual. Rendered as a free-floating
// art-directed asset (never as a rectangular card).
const ELEPHANT_IMAGE = "/images/about/klavetek-prevent-cracks.webp";
const ELEPHANT_ALT =
  "Klavetek elephant with an AAC block — crack-resistant, premium green construction";

/* ------------------------------------------------------------------ */
/*  Variants — premium, understated editorial choreography             */
/* ------------------------------------------------------------------ */

// Resolves to a smooth ease-out cubic-bezier for the line reveals.
const easeEditorial: [number, number, number, number] = [0.22, 1, 0.36, 1];

const outerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const leftContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

// Fade upward with a gentle blur — eyebrow, description, stats & CTA.
const blurReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easePremium },
  },
};

// Editorial line-by-line text reveal (clipped by an overflow-hidden parent).
const lineReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: easeEditorial },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const featuresContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easePremium },
  },
};

const valuesContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const valueItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easePremium },
  },
};

const statsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easePremium },
  },
};

// The visual composition orchestrates photo → elephant depth.
const visualContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.12 } },
};

// The clean editorial company photograph — gently scales from 0.96 to 1.
const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easePremium },
  },
};

// The elephant drifts upward with a soft opacity + scale entrance.
const elephantReveal: Variants = {
  hidden: { opacity: 0, y: 64, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.15, ease: easePremium },
  },
};

/* ------------------------------------------------------------------ */
/*  Magnetic CTA primitive (consistent with the rest of the codebase)  */
/* ------------------------------------------------------------------ */

function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 160, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked, extremely subtle parallax drift for the elephant asset.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const elephantParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.35, 0.75, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] py-20 md:py-28 lg:py-32"
    >
      {/* Premium noise texture background */}
      <div className="noise-bg absolute inset-0 pointer-events-none opacity-[0.03]" />

      {/* Very subtle theme-aware green radial ambiance (behind the composition) */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[860px] w-[860px] translate-y-[-50%] translate-x-[22%] rounded-full bg-gradient-radial from-primary/12 via-primary/5 to-transparent blur-[110px] dark:from-primary/16" />

      {/* Thin decorative green hairline near the section boundary */}
      <div className="mx-auto mb-14 h-px w-[min(92%,76rem)] bg-gradient-to-r from-transparent via-primary/25 to-transparent md:mb-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 xl:px-10">
        <motion.div
          variants={outerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-16 xl:gap-20"
        >
          {/* ── LEFT CONTENT ─────────────────────────────────────── */}
          <motion.div
            variants={leftContainer}
            className="flex max-w-xl flex-col gap-7 md:gap-9"
          >
            {/* Eyebrow */}
            <motion.div variants={blurReveal} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(22,163,74,0.7)]" />
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--muted-text)]">
                {aboutPreview.badge}
              </span>
            </motion.div>

            {/* Large heading - line by line editorial reveal */}
            <motion.div variants={headingContainer}>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-[var(--heading)] sm:text-5xl lg:text-[3.3rem] xl:text-[3.7rem]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={lineReveal} className="block">
                    Redefining Construction
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span variants={lineReveal} className="block">
                    with <span className="text-primary">Green Innovation</span>
                  </motion.span>
                </span>
              </h2>
            </motion.div>

            {/* Refined, concise description */}
            <motion.p
              variants={blurReveal}
              className="max-w-xl text-base leading-relaxed text-[var(--body-text)] opacity-90 md:text-lg"
            >
              {aboutPreview.description}
            </motion.p>

            {/* Editorial proof points — restrained inline stats, no cards */}
            <motion.div
              variants={statsContainer}
              className="flex flex-wrap items-center gap-x-7 gap-y-4 border-y border-[var(--border)] py-5"
            >
              {aboutPreview.stats.map((stat, index) => (
                <motion.div key={index} variants={statItem} className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-[var(--heading)] md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-text)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>


            {/* Key points - clean 2-column typography, no cards */}
            <motion.div
              variants={featuresContainer}
              className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
            >
              {aboutPreview.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={featureItem}
                  className="group flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/60 group-hover:bg-primary/20">
                    <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                  </span>
                  <span className="text-sm font-medium leading-snug text-[var(--body-text)] transition-all duration-300 group-hover:translate-x-[3px] group-hover:text-[var(--heading)]">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Core values - minimal premium pills with glow transition */}
            <motion.div
              variants={valuesContainer}
              className="flex flex-wrap items-center gap-x-3 gap-y-4"
            >
              <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted-text)]">
                Our Core Values
              </span>
              {aboutPreview.values.map((value, index) => (
                <motion.span
                  key={index}
                  variants={valueItem}
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: easePremium }}
                  className="cursor-default rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--body-text)] transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.06] hover:text-primary hover:shadow-[0_0_18px_rgba(var(--primary-rgb),0.18)]"
                >
                  {value}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA - premium magnetic green button with glow + arrow movement */}
            <motion.div variants={blurReveal}>
              <Magnetic strength={0.22} className="inline-flex">
                <motion.div
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                >
                  <Link
                    href={aboutPreview.ctaLink}
                    className="group relative inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(var(--primary-rgb),0.35)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_24px_60px_rgba(var(--primary-rgb),0.5)]"
                  >
                    {/* Soft ambient glow trailing the arrow */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative">{aboutPreview.cta}</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </motion.div>
              </Magnetic>
            </motion.div>
          </motion.div>


          {/* ── RIGHT — ART-DIRECTED VISUAL COMPOSITION (no overlays) ── */}
          <motion.div
            variants={visualContainer}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="relative lg:h-[38rem]">
              {/* Ambient green glow BEHIND the composition */}
              <motion.div
                style={{ opacity: glowOpacity }}
                className="pointer-events-none absolute -inset-12 -z-0 rounded-[80px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-[90px] dark:from-primary/20"
              />

              {/* Existing Klavetek company photo — clean large rounded image */}
              <motion.div
                variants={photoReveal}
                className="relative z-0 mx-auto aspect-[4/5] w-[80%] sm:w-[72%] lg:absolute lg:bottom-0 lg:right-0 lg:aspect-auto lg:h-[82%] lg:w-[66%]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-[var(--border)] shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                  {/* Subtle hover zoom layer (inside overflow-hidden frame) */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  >
                    <Image
                      src={aboutPreview.image}
                      alt="Klavetek Manufacturing Facility - Premium AAC Block Production"
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 45vw, 480px"
                      quality={90}
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Elephant + AAC block — premium floating product visual */}
              <motion.div
                variants={elephantReveal}
                whileHover={prefersReducedMotion ? undefined : { x: 8, y: -8 }}
                transition={{ duration: 0.5, ease: easePremium }}
                className="relative z-10 mx-auto -mb-2 aspect-[5/6] w-[60%] sm:w-[54%] lg:absolute lg:mb-0 lg:h-[76%] lg:w-[62%] lg:-top-10 lg:-left-4"
              >
                {/* Scroll-linked parallax + slow elegant float (wrapper) */}
                <motion.div
                  style={prefersReducedMotion ? undefined : { y: elephantParallax }}
                  className="relative h-full w-full"
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={
                      prefersReducedMotion
                        ? { y: 0 }
                        : { y: [0, -14, 0] }
                    }
                    transition={{
                      duration: 7,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Image
                      src={ELEPHANT_IMAGE}
                      alt={ELEPHANT_ALT}
                      fill
                      sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 460px"
                      quality={90}
                      className="object-contain"
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

