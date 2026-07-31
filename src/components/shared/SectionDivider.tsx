"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
 className?: string;
 variant?: "line" | "dots";
}

export default function SectionDivider({
 className = "",
 variant = "line",
}: SectionDividerProps) {
 if (variant === "dots") {
 return (
 <div className={`flex items-center justify-center gap-2 ${className}`}>
 {[0, 1, 2].map((i) => (
 <motion.span
 key={i}
 initial={{ opacity: 0, scale: 0 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
 className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary"
 />
 ))}
 </div>
 );
 }

 return (
 <motion.div
 initial={{ opacity: 0, scaleX: 0 }}
 whileInView={{ opacity: 1, scaleX: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
 className={`section-divider mx-auto w-full max-w-xs ${className}`}
 />
 );
}