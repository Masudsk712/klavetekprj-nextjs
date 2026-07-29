"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Flame, Box } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: ShieldCheck,
    text: "High Strength",
  },
  {
    icon: Leaf,
    text: "Eco Friendly",
  },
  {
    icon: Flame,
    text: "Fire Resistant",
  },
  {
    icon: Box,
    text: "Lightweight",
  },
];

export default function FloatingProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotateY: 8 }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
        x: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
        rotateY: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
        y: {
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        },
      }}
    >
      <div className="relative w-[360px] overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.08] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        {/* Decorative */}

        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-green-400/10 blur-3xl" />
        <div className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />

        {/* Product Image */}

        <div className="relative mx-auto h-52 w-full">
          <Image
            src="/images/products/product-100.webp"
            alt="AAC Block"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="relative z-10 object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Text Content */}

        <div className="relative z-10 mt-6">
          <h3 className="text-2xl font-semibold text-white">
            Premium AAC Blocks
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Engineered for modern, sustainable and energy-efficient construction.
          </p>
        </div>

        {/* Features */}

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-2.5">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.07, duration: 0.6 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-green-400/25 hover:bg-white/[0.1]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/15 text-green-400 transition-transform duration-300 hover:scale-110">
                  <Icon size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}