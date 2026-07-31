"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, {
 stiffness: 120,
 damping: 30,
 restDelta: 0.001,
 });

 return (
 <motion.div
 style={{ scaleX }}
 className="fixed left-0 top-0 z-[1100] h-[3px] w-full origin-left bg-gradient-to-r from-primary via-accent-glow to-primary-hover shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
 aria-hidden="true"
 />
 );
}