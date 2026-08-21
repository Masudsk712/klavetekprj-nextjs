"use client";

import { motion, type Variants } from "framer-motion";
import { Building2, Monitor, Factory, GraduationCap, Hospital, School } from "lucide-react";
import Link from "next/link";
import { applications } from "@/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import GlassCard from "@/components/shared/GlassCard";
import { easePremium, viewportOnce, staggerContainerFast } from "@/lib/animations";

const containerVariants: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.1, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const iconMap: Record<string, React.ReactNode> = {
 "Residential Buildings": <Building2 className="w-7 h-7 text-white" />,
 "Commercial Buildings": <Monitor className="w-7 h-7 text-white" />,
 "Industrial Projects": <Factory className="w-7 h-7 text-white" />,
 "Hospitals": <Hospital className="w-7 h-7 text-white" />,
 "Educational Institutions": <School className="w-7 h-7 text-white" />,
};
const categorySlugMap: Record<string, string> = {
  "Residential Buildings": "residential-buildings",
  "Commercial Buildings": "commercial-buildings",
  "Industrial Projects": "industrial-projects",
  "Hospitals": "hospitals",
  "Educational Institutions": "educational-institutions",
};


export default function Applications() {
 return (
 <section className="relative py-24 md:py-32 bg-[var(--secondary-bg)] dark:bg-[var(--background)] overflow-hidden noise-bg transition-colors duration-500">
 <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none dark:via-primary/[0.06]" />

 {/* Decorative Elements */}
 <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

 <div className="mx-auto max-w-7xl px-6 lg:px-10">
 <SectionHeader title={applications.title} subtitle={applications.subtitle} />

  <motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  viewport={viewportOnce}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
  {applications.categories.map((category, index) => (
  <motion.div key={category.title} variants={itemVariants}>
  <Link href={`/projects/${categorySlugMap[category.title]}`} className="block">
  <GlassCard className="group relative overflow-hidden hover-lift">
  {/* Background Image with Clean Overlay */}
  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
  <div 
  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
  style={{ backgroundImage: `url(${category.image})` }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
  
  {/* Icon Badge */}
  <div className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
  {iconMap[category.title]}
  </div>
  
  {/* Bottom Text Overlay */}
  <div className="absolute bottom-0 left-0 right-0 p-5">
  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
  {category.title}
  </h3>
  <p className="text-xs text-gray-200 leading-relaxed line-clamp-2">
  {category.description}
  </p>
  </div>
  </div>
  
  {/* Bottom Action Bar */}
  <div className="p-5 flex items-center justify-between border-t border-[var(--border)]">
  <span className="text-sm font-medium text-[var(--muted-text)] group-hover:text-primary transition-colors duration-300">
  Learn More
  </span>
  <motion.div
  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300"
  whileHover={{ scale: 1.1 }}
  >
  <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
  </motion.div>
  </div>
  </GlassCard>
  </Link>
  </motion.div>
  ))}
 </motion.div>
 </div>
 </section>
 );
}