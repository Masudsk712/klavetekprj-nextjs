"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted) {
 return (
 <button
 aria-label="Toggle theme"
 className="relative w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent"
 >
 <div className="w-5 h-5 rounded-full border-2 border-[var(--border)]" />
 </button>
 );
 }

 const isDark = theme === "dark";

 return (
 <motion.button
 onClick={() => setTheme(isDark ? "light" : "dark")}
 className="relative w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border)] bg-transparent"
 whileHover={{ scale: 1.1 }}
 whileTap={{ scale: 0.95 }}
 transition={{ type: "spring", stiffness: 400, damping: 17 }}
 aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
 >
 <AnimatePresence mode="wait">
 {isDark ? (
 <motion.div
 key="moon"
 initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
 animate={{ rotate: 0, opacity: 1, scale: 1 }}
 exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
 className="absolute"
 >
 <Moon className="w-5 h-5 text-black dark:text-white" strokeWidth={2} />
 </motion.div>
 ) : (
 <motion.div
 key="sun"
 initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
 animate={{ rotate: 0, opacity: 1, scale: 1 }}
 exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
 transition={{ duration: 0.3, ease: "easeInOut" }}
 className="absolute"
 >
 <Sun className="w-5 h-5 text-black dark:text-white" strokeWidth={2} />
 </motion.div>
 )}
 </AnimatePresence>

 {/* Subtle glow ring */}
 <motion.span
 className="absolute inset-0 rounded-full"
 animate={{
 boxShadow: isDark
 ? "0 0 20px rgba(var(--primary-rgb), 0.3)"
 : "0 0 20px rgba(var(--primary-rgb), 0.2)",
 }}
 transition={{ duration: 0.3 }}
 />
 </motion.button>
 );
}