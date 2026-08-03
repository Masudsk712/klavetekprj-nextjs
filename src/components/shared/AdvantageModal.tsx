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
            className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative overflow-hidden shadow-2xl border border-white/10"
            style={{
              width: "min(94vw, 1200px)",
              maxWidth: "1200px",
              borderRadius: "32px",
              backgroundColor: "#0F172A",
              boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px -20px rgba(34, 197, 94, 0.3)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-90" />
            </button>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* Left Side - Feature Image (40-45%) */}
              <div className="relative lg:col-span-5 h-[280px] sm:h-[320px] lg:h-auto overflow-hidden lg:rounded-l-[32px]">
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={advantage.image}
                    alt={advantage.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                    unoptimized
                  />
                </motion.div>
                {/* Dark Gradient Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {/* Green Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-transparent mix-blend-overlay" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    <span className="text-white font-semibold text-sm tracking-wide">
                      {advantage.title}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Right Side - Content (55-60%) */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col h-full max-w-2xl"
                >
                  {/* Title */}
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                    {advantage.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-8 shadow-[0_0_12px_rgba(34,197,94,0.6)]" />

                  {/* Brochure Content */}
                  <div className="space-y-5 flex-grow">
                    {contentLines.map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                        className="text-base sm:text-lg text-slate-300 leading-relaxed"
                      >
                        {line}
                      </motion.p>
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
