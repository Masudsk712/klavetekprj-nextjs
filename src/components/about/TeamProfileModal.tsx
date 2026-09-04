"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import TeamAvatar from "@/components/about/TeamAvatar";
import { FacebookIcon, LinkedinIcon } from "@/components/about/social-icons";
import type { TeamMember } from "@/data/team";

interface TeamProfileModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamProfileModal({
  open,
  member,
  onClose,
}: TeamProfileModalProps) {
  // Retain the last member so AnimatePresence can animate the exit.
  const [activeMember, setActiveMember] = useState<TeamMember | null>(member);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open && member) setActiveMember(member);
  }, [open, member]);

  // Keyboard close + body scroll lock while the modal is open.
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
  const prefersReducedMotion = useReducedMotion();
  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 };
  const visible = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  return (
    <AnimatePresence>
      {open && m && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${m.name} — profile`}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <motion.div
            initial={hidden}
            animate={visible}
            exit={hidden}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="team-modal-glow relative flex max-h-[85dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-[var(--surface)]/95 backdrop-blur-xl sm:flex-row"
          >
            {/* ambient green glow behind the portrait (desktop) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-1/2 hidden h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[110px] sm:block"
            />

            {/* Close — always accessible */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile modal"
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition-colors duration-300 hover:bg-primary hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-5 w-5" />
            </button>

            {/* ── Passport-style portrait — centered top (mobile) / left column (desktop).
                All portraits are ~3:4, so an aspect-[3/4] frame + object-contain shows the
                FULL head-to-chest portrait (head, chin, shoulders, suit) at native ratio. ── */}
            <div className="flex shrink-0 flex-col items-center p-4 pt-12 sm:min-h-0 sm:w-[300px] sm:overflow-y-auto sm:p-6 sm:pt-6 lg:w-[320px]">
              <div className="flex w-52 flex-col sm:w-full">
                <div className="team-portrait-frame relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-primary/25 bg-[#f4f5f6] dark:bg-white/[0.04]">
                  <TeamAvatar
                    member={m}
                    fit="contain"
                    objectPosition="center top"
                    sizes="(max-width: 640px) 224px, 320px"
                    priority
                  />
                </div>
                {/* small department / experience strip under the portrait */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-text)]">
                    {m.department}
                  </span>
                  {m.experience && (
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
                      {m.experience}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Profile info ── */}
            <div className="team-modal-scroll min-w-0 flex-1 overflow-y-auto p-5 pt-3 sm:py-6 sm:pl-2 sm:pr-7">
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                {m.position}
              </span>

              <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-[var(--heading)]">
                {m.name}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted-text)]">{m.department}</p>

              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-text)]">
                  About
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)] sm:text-[15px]">
                  {m.about}
                </p>
              </div>

              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-text)]">
                  Responsibilities
                </h3>
                <ul className="mt-2.5 space-y-2">
                  {m.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-[15px] leading-snug text-[var(--body-text)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social links — only shown when a real URL exists */}
              {(m.linkedin || m.facebook) && (
                <div className="mt-4 flex gap-3 border-t border-[var(--border)] pt-4">
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 text-sm font-semibold text-[var(--heading)] transition-colors duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {m.facebook && (
                    <a
                      href={m.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on Facebook`}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-4 text-sm font-semibold text-[var(--heading)] transition-colors duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <FacebookIcon className="h-4 w-4" />
                      Facebook
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
