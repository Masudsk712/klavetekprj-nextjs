"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Advantage } from "@/data/advantages";

interface AdvantageModalProps {
  advantage: Advantage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvantageModal({ advantage, isOpen, onClose }: AdvantageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!advantage) return null;

  // Split brochure content by newlines to preserve formatting
  const contentLines = advantage.brochureContent.split('\n').filter(line => line.trim() !== '');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden bg-white dark:bg-gray-900 backdrop-blur-2xl shadow-2xl border border-green-500/20"
            style={{
              width: "min(92vw, 1000px)",
              maxHeight: "650px",
              borderRadius: "32px",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Side - Feature Image (45%) */}
              <div className="relative h-[280px] sm:h-[320px] lg:h-full lg:w-[45%] flex-shrink-0 overflow-hidden">
                <Image
                  src={advantage.image}
                  alt={advantage.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                  unoptimized
                />
                {/* Green Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:bg-gradient-to-r" />
                {/* Green Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-transparent to-transparent mix-blend-overlay" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 z-10">
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-white font-semibold text-sm tracking-wide">
                      {advantage.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Content (55%) */}
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col overflow-y-auto lg:overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col h-full"
                >
                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {advantage.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-6" />

                  {/* Brochure Content - Exact text only */}
                  <div className="space-y-4 flex-grow">
                    {contentLines.map((line, index) => (
                      <p key={index} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}