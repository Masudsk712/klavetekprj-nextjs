"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";
import { company } from "@/constants/company";

export default function FloatingActions() {
 const [show, setShow] = useState(false);

 useEffect(() => {
 const handleScroll = () => setShow(window.scrollY > 600);
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const whatsappNumber = company.phone2.replace(/\D/g, "");

 return (
 <div className="fixed bottom-6 right-6 z-[1050] flex flex-col items-end gap-3">
 <AnimatePresence>
 {show && (
 <motion.button
 initial={{ opacity: 0, scale: 0.6, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.6, y: 20 }}
 transition={{ type: "spring", stiffness: 400, damping: 22 }}
 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
 aria-label="Scroll to top"
 className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--body-text)] shadow-lg transition-colors hover:border-primary hover:text-primary dark:border-[var(--border)] dark:bg-[var(--surface)] dark:text-[var(--body-text)] dark:hover:border-primary"
 >
 <ArrowUp className="h-5 w-5" />
 </motion.button>
 )}
 </AnimatePresence>

 <motion.a
 href={`https://wa.me/${whatsappNumber}`}
 target="_blank"
 rel="noopener noreferrer"
 aria-label="Chat on WhatsApp"
 initial={{ opacity: 0, scale: 0.6 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 1, type: "spring", stiffness: 400, damping: 22 }}
 whileHover={{ scale: 1.08 }}
 whileTap={{ scale: 0.95 }}
 className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent-glow text-white shadow-[0_12px_40px_rgba(var(--accent-glow-rgb),0.45)]"
 >
 <span className="absolute inset-0 animate-ping rounded-full bg-accent-glow opacity-30" />
 <MessageCircle className="relative h-6 w-6" />
 </motion.a>
 </div>
 );
}