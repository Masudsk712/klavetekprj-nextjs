"use client";

import { motion } from "framer-motion";
import { easePremium } from "@/lib/animations";

type FilterTab = "all" | "completed" | "ongoing" | "upcoming";

interface ProjectFilterProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "completed", label: "Completed" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Upcoming" },
];

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-400 ${
            active === tab.key
              ? "text-white"
              : "text-[var(--muted-text)] dark:text-white/60 hover:text-[var(--heading)] dark:hover:text-white"
          }`}
        >
          {active === tab.key && (
            <motion.span
              layoutId="projectFilterPill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-green"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
