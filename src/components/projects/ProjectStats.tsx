"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Ruler, Clock, Leaf, Zap, Percent } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { easePremium, viewportOnce } from "@/lib/animations";
import type { ProjectStats } from "@/types/project";

interface ProjectStatsProps {
  stats: ProjectStats;
}

const statItems = [
  { key: "totalBlocksUsed", label: "Total Blocks Used", icon: BarChart3, suffix: "" },
  { key: "projectArea", label: "Project Area", icon: Ruler, suffix: " sq.ft" },
  { key: "constructionTimeSaved", label: "Time Saved", icon: Clock, suffix: "" },
  { key: "co2Reduction", label: "CO₂ Reduction", icon: Leaf, suffix: " tonnes" },
  { key: "energySavings", label: "Energy Savings", icon: Zap, suffix: "%" },
  { key: "completionPercentage", label: "Completion", icon: Percent, suffix: "%" },
] as const;

export default function ProjectStats({ stats }: ProjectStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-3xl md:text-4xl font-bold text-center text-[var(--heading)] dark:text-white mb-4"
        >
          Project Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center text-[var(--muted-text)] dark:text-white/60 mb-16 max-w-2xl mx-auto"
        >
          Measurable results that showcase the power of Klavetek AAC blocks.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            const value = stats[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.08, duration: 0.7, ease: easePremium }}
                className="relative group rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-xl p-6 text-center shadow-card hover:shadow-green transition-all duration-500"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[var(--heading)] dark:text-white">
                  {inView && <AnimatedCounter value={value} />}{item.suffix}
                </div>
                <p className="mt-2 text-sm text-[var(--muted-text)] dark:text-white/60">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
