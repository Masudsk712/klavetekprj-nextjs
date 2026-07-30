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
            className="mt-10 text-[46px] font-semibold leading-[1.08] tracking-tight text-white md:text-[54px] lg:text-[58px]"
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
            className="mt-7 max-w-[520px] text-base leading-[1.7] text-white/88 md:text-base"
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
            className="mt-14 flex flex-wrap items-center gap-5 text-xs font-medium text-white/75"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-green-400/90" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Leaf size={16} className="text-green-400/90" />
              <span>Eco Friendly</span>
            </div>
            <div className="hidden items-center gap-2.5 md:flex">
              <Truck size={16} className="text-green-400/90" />
              <span>PAN India Delivery</span>
            </div>
          </motion.div>

        </div>

      </div>
    </Container>
  );
}
