"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useTheme } from "next-themes";

interface TeamMemberModalProps {
  open: boolean;
  member: {
    id: string;
    name: string;
    position: string;
    department: string;
    experience: string;
    bio: string;
    responsibilities: string[];
    image: string;
    linkedin?: string;
  } | null;
  onClose: () => void;
}

export default function TeamProfileModal({ open, member, onClose }: TeamMemberModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // Retain the last member so AnimatePresence can animate the exit
  const [activeMember, setActiveMember] = useState(member);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && member) setActiveMember(member);
  }, [open, member]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const m = activeMember;
  const panelBg = isDark ? "bg-[#111513] border-white/10" : "bg-white border-gray-200";
  const text = isDark ? "text-white/90" : "text-black/90";
  const muted = isDark ? "text-white/60" : "text-black/60";

  return (
    <AnimatePresence>
      {open && m && (
        <motion.div
          key="team-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${m.name} profile`}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-3xl border ${panelBg} shadow-2xl md:flex-row md:overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors hover:bg-black/50"
              aria-label="Close profile modal"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <div className="relative h-64 w-full shrink-0 md:h-auto md:w-2/5 md:min-h-[480px]">
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            <div className={`flex-1 overflow-y-auto p-6 md:p-8 ${text}`}>
              <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {m.department}
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">{m.name}</h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-primary/80">
                {m.position}
              </p>
              <p className={`mt-1 text-sm ${muted}`}>{m.experience}</p>

              <div className="mt-6 border-t border-[var(--border)] pt-6">
                <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${muted}`}>About</h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--body-text)]">{m.bio}</p>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-6">
                <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${muted}`}>Responsibilities</h3>
                <ul className="mt-3 space-y-2.5">
                  {m.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-[15px] leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {m.linkedin && (
                <div className="mt-6 border-t border-[var(--border)] pt-6">
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.18h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V24h-4v-9.03c0-2.15-.04-4.92-3-4.92-3 0-3.45 2.34-3.45 4.75V24h-4V8z" />
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}