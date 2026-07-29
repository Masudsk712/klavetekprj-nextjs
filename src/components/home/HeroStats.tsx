"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "10+",
    label: "Years Experience",
    icon: "🏆",
  },
  {
    number: "500+",
    label: "Projects Served",
    icon: "🏗️",
  },
  {
    number: "100%",
    label: "Quality Focus",
    icon: "⭐",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-14 grid grid-cols-3 gap-6"
    >

      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-green-400/40 hover:shadow-[0_8px_32px_rgba(89,194,46,0.2)] hover:-translate-y-1"
        >
          {/* Premium glow effect */}

          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          {/* Icon */}

          <div className="relative z-10 mb-3 text-3xl">
            {item.icon}
          </div>

          {/* Number */}

          <h3 className="relative z-10 text-4xl font-bold text-green-400 md:text-5xl">
            {item.number}
          </h3>

          {/* Label */}

          <p className="relative z-10 mt-2 text-sm font-medium text-white/80">
            {item.label}
          </p>

          {/* Bottom accent line */}

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>
      ))}

    </motion.div>
  );
}
