"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Quote } from "lucide-react";
import Container from "@/components/shared/Container";
import Image from "next/image";
import { mdMessage } from "@/data/about";
import { managingDirector } from "@/data/team";
import { easePremium, viewportOnce } from "@/lib/animations";
import { useTheme } from "next-themes";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easePremium },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function MDMessage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Footer-matching theme: light = white, dark = #070807
  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const bg = isDark ? "bg-[#070807]" : "bg-white";
  const titleColor = isDark ? "text-white" : "text-black";
  const bodyColor = isDark ? "text-white/70" : "text-black/70";
  const borderColor = isDark ? "border-white/10" : "border-gray-200";
  const accent = "text-primary";

  return (
    <section className={`relative overflow-hidden ${bg} py-24 md:py-32 transition-colors duration-300`}>
      {/* ambient green glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-accent-glow/8 blur-[110px]" />

      <Container>
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
            className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${titleColor}`}
          >
            {mdMessage.title}
          </motion.h2>
        </div>

        <div ref={frameRef} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait — real Managing Director image, editorial clamp reveal */}
          <div className="relative order-2 lg:order-1">
            <div className="pointer-events-none absolute -inset-6 rounded-[48px] bg-gradient-radial from-primary/20 to-transparent blur-[70px]" />
            <motion.div
              initial={{ clipPath: prefersReducedMotion ? undefined : "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE }}
              className={`relative overflow-hidden rounded-[28px] border ${isDark ? "border-white/10" : "border-gray-200"} shadow-xl`}
            >
              <motion.div
                style={prefersReducedMotion ? undefined : { y: innerY }}
                className="relative aspect-[4/5] w-full"
              >
                <Image
                  src={managingDirector.image}
                  alt={managingDirector.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>

          {/* Message — theme-aware contrast */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-1 lg:order-2"
          >
            <motion.span variants={reveal} className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] ${accent}`}>
              <span className={`h-px w-10 bg-gradient-to-r from-primary to-transparent`} />
              {mdMessage.eyebrow}
            </motion.span>

            <motion.div variants={reveal} className="relative mt-8">
              <Quote className="h-12 w-12 text-primary/30" />
              <p className={`mt-4 text-2xl font-semibold leading-[1.35] tracking-tight md:text-[28px] ${titleColor}`}>
                &ldquo;{mdMessage.quote}&rdquo;
              </p>
            </motion.div>

            <motion.p variants={reveal} className={`mt-7 max-w-xl text-base leading-[1.85] ${bodyColor}`}>
              {mdMessage.message}
            </motion.p>

            <motion.div variants={reveal} className={`mt-10 border-t pt-7 ${borderColor}`}>
              <div className={`text-lg font-semibold ${titleColor}`}>{managingDirector.name}</div>
              <div className={`mt-1 text-sm ${accent}`}>{managingDirector.position}</div>
              <div className={`mt-2 text-xs font-medium uppercase tracking-widest ${bodyColor}`}>
                Klavetek Green Blocks &amp; Tiles Pvt. Ltd.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}