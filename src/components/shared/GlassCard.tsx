"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { easePremium, viewportOnce } from "@/lib/animations";

interface GlassCardProps {
 children: ReactNode;
 className?: string;
 hover?: boolean;
 delay?: number;
 onClick?: () => void;
 elevated?: boolean;
}

const cardVariants: Variants = {
 hidden: { opacity: 0, y: 28 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.7, ease: easePremium },
 },
};

export default function GlassCard({
 children,
 className = "",
 hover = true,
 delay = 0,
 onClick,
 elevated = true,
}: GlassCardProps) {
 return (
 <motion.div
 variants={cardVariants}
 initial="hidden"
 whileInView="visible"
 viewport={viewportOnce}
 transition={{ delay }}
 whileHover={
 hover
 ? {
 y: -6,
 scale: 1.008,
 boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
 transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
 }
 : undefined
 }
 onClick={onClick}
 className={`rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/75 backdrop-blur-xl transition-all duration-300 ${
 elevated ? "shadow-card" : "shadow-sm"
 } hover:shadow-card-hover ${hover ? "cursor-pointer" : ""} ${className}`}
 >
 {children}
 </motion.div>
 );
}
