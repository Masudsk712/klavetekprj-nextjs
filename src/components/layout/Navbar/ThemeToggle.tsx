"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-20 rounded-full border border-gray-200 bg-white" />
    );
  }

  const dark = (theme === "system"
    ? resolvedTheme
    : theme) === "dark";

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() =>
        setTheme(dark ? "light" : "dark")
      }
      className="relative flex h-11 w-20 items-center rounded-full border border-gray-200 bg-white p-1 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white ${
          dark ? "translate-x-9" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon size={18} />
        ) : (
          <Sun size={18} />
        )}
      </motion.div>
    </button>
  );
}