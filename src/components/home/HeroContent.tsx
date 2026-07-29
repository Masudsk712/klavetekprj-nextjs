"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import HeroButtons from "./HeroButtons";
import HeroBadges from "./HeroBadges";
import FloatingProductCard from "./FloatingProductCard";

export default function HeroContent() {
  return (
    <Container>
      <div className="relative z-50 flex min-h-screen items-center py-24 lg:py-0">

        {/* LEFT CONTENT */}

        <div className="w-full max-w-2xl">

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
            className="mt-10 text-[58px] font-semibold leading-[1.05] tracking-tight text-white md:text-[66px] lg:text-[68px]"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            Building Tomorrow
            <span className="mt-3 block bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent">
              With Premium AAC Blocks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-7 max-w-lg text-base leading-relaxed text-white/85 md:text-lg"
          >
            Engineered for superior strength, thermal insulation and sustainable construction — trusted by builders across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10"
          >
            <HeroButtons />
          </motion.div>

          {/* Trust indicators */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-10 flex items-center gap-6 text-xs text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <span>Eco-Friendly</span>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-px w-8 bg-white/30" />
              <span>PAN India Delivery</span>
            </div>
          </motion.div>

        </div>

        {/* RIGHT SIDE */}

        <div className="hidden lg:flex lg:w-5/12 lg:justify-end">
          <FloatingProductCard />
        </div>

      </div>
    </Container>
  );
}