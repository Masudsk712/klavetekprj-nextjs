"use client";

import { useRef, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import TeamAvatar from "@/components/about/TeamAvatar";
import type { TeamMember } from "@/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: () => void;
  /** When the carousel detects an actual touch swipe, it flips this flag so a
   *  trailing `click` (fired after the drag) doesn't open the modal. */
  suppressClickRef?: RefObject<boolean | null>;
  /** -1 on the decorative duplicate clones (kept out of the tab order). */
  tabIndex?: number;
}

export default function TeamMemberCard({
  member,
  onSelect,
  suppressClickRef,
  tabIndex = 0,
}: TeamMemberCardProps) {
  // Keep sync click count parity without causing re-renders.
  const suppressed = useRef(false);

  const handleClick = () => {
    if (suppressClickRef?.current || suppressed.current) {
      if (suppressClickRef?.current) suppressClickRef.current = false;
      suppressed.current = false;
      return;
    }
    onSelect();
  };

  return (
    <div
      role="button"
      tabIndex={tabIndex}
      aria-label={`View profile of ${member.name}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative mr-5 w-[min(320px,82vw)] shrink-0 select-none cursor-pointer overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] outline-none transition-[transform,border-color,box-shadow,outline-color] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-primary/45 hover:shadow-[0_22px_60px_-20px_rgba(0,0,0,0.55),0_0_52px_-14px_rgba(22,163,74,0.45)] focus-visible:-translate-y-1.5 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:mr-6 md:w-[320px]"
    >
      {/* ── Portrait ── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07] group-focus-visible:scale-[1.07]">
          <TeamAvatar
            member={member}
            sizes="(max-width: 640px) 70vw, (max-width: 900px) 45vw, 22vw"
          />
        </div>
        {/* Bottom gradient blends the portrait into the dark-glass info panel */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/5 to-transparent" />
        {/* soft green ambient glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_70px_rgba(22,163,74,0.35)] transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* ── Dark glass lower info panel ── */}
      <div className="relative -mt-px flex flex-col border-t border-[var(--border)] bg-[var(--surface)]/85 p-4 backdrop-blur-md sm:p-5">
        <h3 className="text-[17px] font-semibold leading-tight text-[var(--heading)]">
          {member.name}
        </h3>
        <div className="mt-1 text-sm font-semibold text-primary">
          {member.position}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted-text)]">
            {member.department}
          </span>
          {member.experience && (
            <>
              <span className="h-1 w-1 rounded-full bg-primary/60" />
              <span className="text-[11px] font-medium text-[var(--muted-text)]">
                {member.experience}
              </span>
            </>
          )}
        </div>

        {member.shortDescription && (
          <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[var(--muted-text)]">
            {member.shortDescription}
          </p>
        )}

        <div className="mt-4 inline-flex items-center gap-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-all duration-300 group-hover:gap-2.5">
          View Profile
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
