"use client";

import { useRef } from "react";
import type { TeamMember } from "@/data/team";
import TeamMemberCard from "@/components/about/TeamMemberCard";

interface TeamCarouselProps {
  members: TeamMember[];
  onSelect: (member: TeamMember) => void;
}

/**
 * The PARENT that renders the entire team list in ONE horizontal,
 * non-wrapping track and moves it continuously as a seamless infinite
 * marquee (right → left).
 *
 * Layout (see globals.css):
 *   .team-carousel (viewport — overflow hidden + edge fade)
 *     .team-drag                    (manual swipe translation target)
 *       .team-marquee-track         (CSS keyframe animation, 0 → -50%)
 *         .team-seq  members         original sequence
 *         .team-seq  members         duplicate sequence (aria-hidden)
 *
 * Because the track holds the full sequence EXACTLY twice, translating
 * it by exactly -50% equals ONE complete list, so the loop rejoins with
 * no visible reset. Hover/focus pauses the movement via animation-play-state.
 *
 * Swiping temporarily pauses the CSS animation and translates the drag
 * wrapper through refs (no state, no re-renders while moving), then
 * snaps back and resumes. A suppressed-click ref prevents the trailing
 * click after a real swipe from opening the wrong modal.
 */
export default function TeamCarousel({ members, onSelect }: TeamCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null); // CSS animation track
  const dragRef = useRef<HTMLDivElement | null>(null); // manual swipe target
  const suppressClickRef = useRef(false);

  const drag = useRef({
    pointerId: -1,
    startX: 0,
    moved: false,
  });

  const DRAG_THRESHOLD = 6;

  // Handlers are plain function declarations (hoisted), so `endDrag` may
  // reference `handlePointerMove` and itself without ordering issues.

  function handlePointerMove(e: PointerEvent) {
    if (drag.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) drag.current.moved = true;
    if (dragRef.current) {
      dragRef.current.style.transform = `translate3d(${dx}px, 0, 0)`;
    }
  }

  function endDrag(e: PointerEvent) {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.pointerId = -1;

    // If this was a real swipe, swallow the stray `click` so it does not
    // open a profile modal.
    if (drag.current.moved) suppressClickRef.current = true;

    // Snap the content back and resume the CSS auto-marquee smoothly.
    if (dragRef.current) {
      dragRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
      dragRef.current.style.transform = "translate3d(0, 0, 0)";
    }
    if (trackRef.current) trackRef.current.style.animationPlayState = "";

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { pointerId: e.pointerId, startX: e.clientX, moved: false };

    // Pause the auto-marquee while the user is dragging and clear any
    // leftover snap-back transition.
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
    if (dragRef.current) dragRef.current.style.transition = "none";

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }

  const renderCard = (member: TeamMember, key: string, tabIndex: number) => (
    <TeamMemberCard
      key={key}
      member={member}
      onSelect={() => onSelect(member)}
      suppressClickRef={suppressClickRef}
      tabIndex={tabIndex}
    />
  );

  return (
    <div
      className="team-carousel"
      role="region"
      aria-label="Team members carousel"
      aria-roledescription="carousel"
      onPointerDown={onPointerDown}
    >
      <div ref={dragRef} className="team-drag">
        <div ref={trackRef} className="team-marquee-track">
          {/* Original sequence — interactive, keyboard reachable */}
          <div className="team-seq">
            {members.map((m) => renderCard(m, `original-${m.id}`, 0))}
          </div>
          {/* Duplicate sequence — decorative clone driving the seamless loop */}
          <div className="team-seq" aria-hidden="true">
            {members.map((m) => renderCard(m, `duplicate-${m.id}`, -1))}
          </div>
        </div>
      </div>
    </div>
  );
}