"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: [0, 8, 0],
      }}
      transition={{
        delay: 1.5,
        repeat: Infinity,
        duration: 2,
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
    >
      <ChevronDown size={34} />
    </motion.div>
  );
}