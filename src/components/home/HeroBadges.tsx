"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function HeroBadges() {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
 className="inline-flex items-center gap-2.5 rounded-full border border-accent-glow/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-accent-glow backdrop-blur-xl"
 >
 <ShieldCheck size={17} />

 <span>ISO Certified Quality</span>
 </motion.div>
 );
}