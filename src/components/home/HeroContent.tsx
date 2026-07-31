"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Truck } from "lucide-react";
import Container from "@/components/shared/Container";
import HeroButtons from "./HeroButtons";
import HeroBadges from "./HeroBadges";

export default function HeroContent() {
  return (
    <Container>
      <div className="relative z-50 py-12 md:py-16 lg:py-20">

        {/* LEFT CONTENT */}

        <div className="w-full max-w-[650px]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroBadges />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 text-[46px] font-semibold leading-[1.08] tracking-tight text-white md:text-[54px] lg:text-[60px]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            Building Tomorrow
            <span className="mt-3 block bg-gradient-to-r from-primary via-accent-glow to-primary-hover bg-clip-text text-transparent animate-gradient">
              With Premium AAC Blocks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-7 max-w-[520px] text-base leading-[1.75] text-white/90 md:text-lg"
          >
            Engineered for superior strength, thermal insulation and sustainable construction — trusted by builders across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-9"
          >
            <HeroButtons />
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-14 flex flex-wrap items-center gap-6 text-sm font-medium text-accent-glow"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <ShieldCheck size={16} className="text-accent-glow" />
              </div>
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <Leaf size={16} className="text-accent-glow" />
              </div>
              <span>Eco Friendly</span>
            </div>
            <div className="hidden items-center gap-2.5 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <Truck size={16} className="text-accent-glow" />
              </div>
              <span>PAN India Delivery</span>
            </div>
          </motion.div>

        </div>

      </div>
    </Container>
  );
}