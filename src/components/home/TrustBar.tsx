"use client";

import { motion } from "framer-motion";
import { trustBar } from "@/data/home";
import { 
  Award, 
  Leaf, 
  ClipboardCheck, 
  GraduationCap, 
  Truck, 
  Headphones 
} from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { easePremium, viewportOnce } from "@/lib/animations";

const trustBarInfo = {
  ...trustBar,
  features: [
    {
      icon: Award,
      title: "Premium Quality",
      description: "ISI certified blocks manufactured with precision"
    },
    {
      icon: Leaf,
      title: "Sustainable Manufacturing",
      description: "Eco-friendly process using fly ash waste"
    },
    {
      icon: ClipboardCheck,
      title: "IS Standard Compliant",
      description: "Fully compliant with IS 2185 standards"
    },
    {
      icon: GraduationCap,
      title: "Trusted by Industry Experts",
      description: "Recommended by leading architects & engineers"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Pan-India logistics with real-time tracking"
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "24/7 technical assistance for all projects"
    },
  ],
  trustStrip: [
    { icon: "🏆", text: "6+ Years Experience" },
    { icon: "🚚", text: "Pan India Delivery" },
    { icon: "🛡", text: "Quality Assured" },
    { icon: "⚡", text: "Fast Manufacturing" },
    { icon: "🌱", text: "Eco-Friendly Production" },
  ],
};

const statCards = trustBar.stats.map((stat, index) => ({
  ...stat,
  icon: ["Building2", "LayoutGrid", "Boxes", "Smile", "Users"][index],
}));

export default function TrustBar() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none dark:via-primary/[0.06]" />
      
      {/* Subtle Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(22, 163, 74, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Very Low Opacity Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Soft Gradient Lighting */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22, 163, 74, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header Section */}
        <div className="text-center mb-14 md:mb-16">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easePremium }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/15 bg-primary/[0.06] backdrop-blur-sm mb-6"
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-primary tracking-wide uppercase">
              Trusted Across India
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easePremium, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--heading)] dark:text-white leading-tight"
          >
            Trusted by Builders & Developers{" "}
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Across India
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: easePremium, delay: 0.2 }}
            className="mt-5 md:mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-[var(--body-text)] dark:text-[var(--muted-text)]"
          >
            Delivering premium AAC blocks with unmatched quality, strength and reliability for residential, commercial and industrial projects.
          </motion.p>
        </div>

        {/* Trust Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          transition={{ staggerChildren: 0.08, delayChildren: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-14"
        >
          {trustBarInfo.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: easePremium }
                },
              }}
              whileHover={{ 
                y: -4,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="group relative"
            >
              <GlassCard elevated={false} hover={false} className="!rounded-2xl border border-[var(--border)] !bg-[var(--surface)]/60 backdrop-blur-sm p-5 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-green">
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-11 h-11 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-sm md:text-base font-bold text-[var(--heading)] dark:text-white mb-1 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--muted-text)] dark:text-[var(--muted-text)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={viewportOnce}
          transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-14 md:mb-16"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.7, ease: easePremium }
                },
              }}
              whileHover={{ 
                y: -8,
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(22, 163, 74, 0.4)",
                borderColor: "rgba(22, 163, 74, 0.4)",
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="group relative"
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <GlassCard elevated={false} hover={false} className="!rounded-3xl border border-[var(--border)] !bg-[var(--surface)]/70 backdrop-blur-xl !p-6 md:!p-7 text-center transition-all duration-300 cursor-default">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 mb-4">
                  <div className="w-6 h-6 text-primary">
                    {stat.icon === 'Building2' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M9 7h6M9 11h6M9 15h3" />
                      </svg>
                    )}
                    {stat.icon === 'LayoutGrid' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    )}
                    {stat.icon === 'Boxes' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    )}
                    {stat.icon === 'Smile' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    )}
                    {stat.icon === 'Users' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Value with Counter */}
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-primary to-primary-hover bg-clip-text text-transparent mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} duration={2.4} />
                </div>

                {/* Label */}
                <div className="text-xs md:text-sm font-semibold text-[var(--muted-text)] dark:text-[var(--muted-text)] tracking-wide">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easePremium, delay: 0.8 }}
        >
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-xl !p-1 shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0 md:divide-x divide-[var(--border)]">
              {trustBarInfo.trustStrip.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-3 group hover:bg-primary/[0.04] transition-colors duration-300"
                >
                  <span className="text-lg md:text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-[var(--heading)] dark:text-white whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}