"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Zap,
  Flame,
  Feather,
  Shield,
  Volume2,
  Leaf,
  Droplets,
  Thermometer,
} from "lucide-react";
import { advantages } from "@/data/advantages";
import SectionHeader from "@/components/shared/SectionHeader";
import AdvantageModal from "@/components/shared/AdvantageModal";
import { easePremium, viewportOnce } from "@/lib/animations";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-5 h-5 text-white" />,
  Flame: <Flame className="w-5 h-5 text-white" />,
  Feather: <Feather className="w-5 h-5 text-white" />,
  Shield: <Shield className="w-5 h-5 text-white" />,
  Volume2: <Volume2 className="w-5 h-5 text-white" />,
  Leaf: <Leaf className="w-5 h-5 text-white" />,
  Droplets: <Droplets className="w-5 h-5 text-white" />,
  Thermometer: <Thermometer className="w-5 h-5 text-white" />,
};

export default function WhyKlavetekStandsOut() {
  const [selectedAdvantage, setSelectedAdvantage] = useState<typeof advantages[0] | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Premium radial green glow background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/[0.08] via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A34A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader 
          title="Why Klavetek Stands Out" 
          subtitle="Smart Features That Make Klavetek AAC Blocks the Preferred Choice for Modern Construction."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {advantages.map((advantage) => (
            <motion.div key={advantage.id} variants={itemVariants}>
              <div className="group relative h-full flex flex-col rounded-[28px] border border-green-500/30 bg-white/5 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-green-lg transition-all duration-300 hover:-translate-y-2">
                
                {/* Image Section */}
                <div className="relative h-[200px] overflow-hidden flex-shrink-0">
                  <Image
                    src={advantage.image}
                    alt={advantage.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    unoptimized
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.getAttribute("data-fallback") !== "1") {
                        img.setAttribute("data-fallback", "1");
                        img.src = "/images/features/Eco-Friendly.webp";
                      }
                    }}
                  />
                  
                  {/* Soft dark/green gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Glass icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <div className="text-white">
                      {iconMap[advantage.icon]}
                    </div>
                  </div>
                </div>

                {/* Content Section - Flex layout to push button to bottom */}
                <div className="relative p-6 flex flex-col flex-grow">
                  {/* Thin green top border accent */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {advantage.shortSummary}
                  </p>

                  {/* View Details Button - Always at bottom */}
                  <button 
                    onClick={() => setSelectedAdvantage(advantage)}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 mt-auto"
                  >
                    View Details
                    <svg 
                      className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_30px_rgba(22,163,74,0.15)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Advantage Modal */}
      <AdvantageModal
        advantage={selectedAdvantage}
        isOpen={!!selectedAdvantage}
        onClose={() => setSelectedAdvantage(null)}
      />
    </section>
  );
}