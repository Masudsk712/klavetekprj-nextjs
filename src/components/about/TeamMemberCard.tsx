"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TeamAvatar from "@/components/about/TeamAvatar";
import { FacebookIcon, LinkedinIcon } from "@/components/about/social-icons";
import { easePremium } from "@/lib/animations";
import type { TeamMember } from "@/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: () => void;
}

export default function TeamMemberCard({ member, onSelect }: TeamMemberCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easePremium },
    },
  };

  const links = [
    { icon: LinkedinIcon, href: member.linkedin, label: `${member.name} on LinkedIn` },
    { icon: FacebookIcon, href: member.facebook, label: `${member.name} on Facebook` },
  ].filter((l) => l.href);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-card-hover"
      aria-label={`View profile of ${member.name}`}
    >
      {/* ── Portrait ── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]">
          <TeamAvatar member={member} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* green ambient glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_70px_rgba(22,163,74,0.35)] transition-opacity duration-500 group-hover:opacity-100" />

        {/* social icons — slide in on hover (only rendered when a real URL exists) */}
        {links.length > 0 && (
          <div className="absolute bottom-14 right-3 flex translate-x-3 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition-colors duration-300 hover:bg-primary hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="text-base font-semibold text-[var(--heading)] dark:text-white">
          {member.name}
        </div>
        <div className="mt-0.5 text-sm font-medium text-primary">
          {member.position}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted-text)] dark:text-white/55">
            {member.department}
          </span>
          {member.experience && (
            <>
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              <span className="text-[11px] font-medium text-[var(--muted-text)] dark:text-white/55">
                {member.experience}
              </span>
            </>
          )}
        </div>
        {member.shortDescription && (
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted-text)] dark:text-white/60">
            {member.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 group-hover:gap-2.5">
            View Profile
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
