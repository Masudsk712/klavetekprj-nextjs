"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "@/components/shared/Container";
import { teamMembers, type TeamMember } from "@/data/team";
import { teamSection } from "@/data/about";
import { easePremium, viewportOnce } from "@/lib/animations";
import TeamMemberCard from "@/components/about/TeamMemberCard";
import TeamProfileModal from "@/components/about/TeamProfileModal";

export default function TeamSection() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };

  const headerReveal: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easePremium },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] py-16 transition-colors duration-300 md:py-28">
      {/* fine top divider + ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />

      <Container>
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <motion.span
            variants={headerReveal}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            {teamSection.eyebrow}
            <span className="h-px w-8 bg-gradient-to-l from-primary to-transparent" />
          </motion.span>

          <motion.h2
            variants={headerReveal}
            className="mt-5 text-3xl font-bold tracking-tight text-[var(--heading)] md:text-4xl lg:text-5xl"
          >
            {teamSection.title}
          </motion.h2>

          <motion.p
            variants={headerReveal}
            className="mt-5 text-base leading-relaxed text-[var(--muted-text)] dark:text-white/65 md:text-lg"
          >
            {teamSection.subtitle}
          </motion.p>

          <motion.p
            variants={headerReveal}
            className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--muted-text)] dark:text-white/55"
          >
            {teamSection.intro}
          </motion.p>
        </motion.div>

        {/* ── Team grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onSelect={() => setSelected(member)}
            />
          ))}
        </motion.div>
      </Container>

      <TeamProfileModal
        open={selected !== null}
        member={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
