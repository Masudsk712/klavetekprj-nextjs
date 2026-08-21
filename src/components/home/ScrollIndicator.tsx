"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1, y: [0, 6, 0] }}
 transition={{
 delay: 1.5,
 repeat: Infinity,
 duration: 2.2,
 ease: "easeInOut",
 }}
 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black dark:text-white"
 >
 <div className="relative h-6 w-4 rounded-full border border-black/40 dark:border-white/70">
 <motion.span
 animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
 transition={{
 delay: 1.6,
 repeat: Infinity,
 duration: 2.2,
 ease: "easeInOut",
 }}
 className="absolute left-1/2 top-1 h-1 w-0.5 -translate-x-1/2 bg-black/60 dark:bg-white"
 />
 </div>
 </motion.div>
 );
}
