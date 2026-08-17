"use client";

import Image from "next/image";
import type { TeamMember } from "@/data/team";

interface TeamAvatarProps {
  member: Pick<TeamMember, "id" | "name" | "image">;
  sizes?: string;
  objectPosition?: string;
  priority?: boolean;
  quality?: number;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "K";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * Renders a team member's real portrait, or — when no photo exists yet —
 * a clean premium placeholder (initials monogram on the green/black brand
 * surface). All real image paths live in the team data, never in JSX.
 */
export default function TeamAvatar({
  member,
  sizes,
  objectPosition = "center 35%",
  priority = false,
  quality = 90,
}: TeamAvatarProps) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes={
          sizes ??
          "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        }
        quality={quality}
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />
    );
  }

  return (
    <div
      className="team-avatar-placeholder absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      role="img"
      aria-label={`${member.name} — portrait coming soon`}
    >
      <div className="team-avatar-grid absolute inset-0" aria-hidden="true" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/25 bg-black/30 shadow-[0_0_40px_rgba(22,163,74,0.25)] ring-1 ring-white/10">
        <span className="text-2xl font-semibold tracking-wide text-primary">
          {initials(member.name)}
        </span>
      </div>
      <span className="relative mt-4 text-[10px] font-medium uppercase tracking-[0.32em] text-white/55">
        Klavetek Team
      </span>
    </div>
  );
}
