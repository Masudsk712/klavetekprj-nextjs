"use client";

import { motion, type Variants } from "framer-motion";
import { easePremium, viewportOnce } from "@/lib/animations";

interface SectionHeaderProps {
 title: string;
 subtitle?: string;
 centered?: boolean;
 light?: boolean;
 className?: string;
}

const headerVariants: Variants = {
 hidden: { opacity: 0, y: 28 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

const subVariants: Variants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easePremium } },
};

export default function SectionHeader({
 title,
 subtitle,
 centered = true,
 light = false,
 className = "",
}: SectionHeaderProps) {
 return (
 <motion.div
 initial="hidden"
 animate="visible"
 viewport={viewportOnce}
 className={`mb-14 md:mb-20 ${centered ? "text-center" : ""} ${className}`}
 >
 <motion.h2
 variants={headerVariants}
 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--heading)] dark:text-white"
 >
 {title}
 </motion.h2>
 {subtitle && (
 <motion.p
 variants={subVariants}
 className={`mt-5 md:mt-7 text-base md:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${light ? "text-[var(--body-text)]" : "text-[var(--body-text)]"} dark:text-[var(--muted-text)]`}
 >
 {subtitle}
 </motion.p>
 )}
 </motion.div>
 );
}
