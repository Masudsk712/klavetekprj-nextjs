"use client";

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { TeamMember } from "@/data/team";
import TeamMemberCard from "@/components/about/TeamMemberCard";

interface TeamCarouselProps {
  members: TeamMember[];
  onSelect: (member: TeamMember) => void;
}

/** Slow, premium auto-scroll speed (px / second). */
const BASE_SPEED = 30;
/** While the user hovers, movement is SLOWER — never stopped. */
const HOVER_SPEED = 9;
/** px of horizontal travel before a drag counts as a "swipe". */
const DRAG_THRESHOLD = 6;

/**
 * The PARENT rendering the entire team list in ONE horizontal,
 * non-wrapping track that moves continuously right → left as a seamless
 * infinite loop, driven by requestAnimationFrame (not CSS keyframes) so we
 * can keep it moving on hover (just slower), support real touch swipes that
 * MOVE the content, and stay hardware-friendly with ref-held offset.
 *
 * Layout (see globals.css):
 *   .team-carousel (viewport — overflow hidden + edge fade)
 *     .team-marquee-track (animated via inline transform each frame)
 *       .team-seq  members     original sequence
 *       .team-seq  members     duplicate sequence (aria-hidden)
 *
 * Loop model: the track holds the full sequence EXACTLY twice. We keep a
 * virtual scroll position `x` (px, ref — no re-renders) and render
 * `translate3d(-(x mod sequenceWidth))`. Because one full sequence equals
 * the width of a single `.team-seq`, wrapping the offset modulo that width
 * makes the loop rejoin seamlessly — no jump, blank gap or reset.
 *
 * Interaction:
 *   • Touch swipe increments/decrements `x` so the content follows the
 *     finger and STAYS where the user moved it.
 *   • A real swipe flips `suppressClickRef` so the trailing `click` does
 *     not open a modal; a normal tap/click still opens that member's modal.
 *   • Hover only changes `speedRef` — movement continues (just slower).
 *   • prefers-reduced-motion stops AUTO movement but keeps swipe + tap.
 */
export default function TeamCarousel({ members, onSelect }: TeamCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const suppressClickRef = useRef(false);
  /** Auto-clears so a swipe suppression can never leak into a later tap. */
  const suppressTimeoutRef = useRef<number | null>(null);

  // --- Movement state (refs: no re-renders per frame) ---
  const xRef = useRef(0);
  const seqWidthRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  /** Measure the width of a single sequence (cards have fixed widths). */
  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    const seq = track.firstElementChild as HTMLElement | null;
    if (seq) seqWidthRef.current = seq.offsetWidth;
  };

  /** Push the current xRef onto the DOM as translate3d (-x mod seq width). */
  const applyTransform = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = seqWidthRef.current || track.offsetWidth / 2;
    if (width <= 0) return;
    const wrapped = ((xRef.current % width) + width) % width;
    track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
  };

  // --- requestAnimationFrame loop (auto-movement) ---
  useEffect(() => {
    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      if (!drag.current.active && !reducedMotionRef.current) {
        xRef.current += speedRef.current * dt; // right → left
      }
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };

    measure();
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // Track reduced-motion preference live.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMq = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onMq);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (suppressTimeoutRef.current) {
        clearTimeout(suppressTimeoutRef.current);
        suppressTimeoutRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // --- Touch / mouse swipe (real movement, not a snap-back) ---
  function handlePointerMove(e: PointerEvent) {
    if (!drag.current.active || drag.current.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      drag.current.moved = true;
    }
    // Content follows the finger: dragging right shows earlier content (x↓),
    // dragging left advances the scroll (x↑).
    xRef.current = drag.current.startScroll - dx;
    applyTransform();
  }

  function endDrag(e: PointerEvent) {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.active = false;
    drag.current.pointerId = -1;

    // A real swipe must NOT also trigger the card `click` the browser fires
    // right after pointerup.
    if (drag.current.moved) {
      // Clear any previous pending suppressor, set it, then auto-clear it a
      // moment later so it can NEVER leak into the next deliberate tap
      // (which would wrongly prevent that exact member's modal from opening).
      if (suppressTimeoutRef.current) {
        clearTimeout(suppressTimeoutRef.current);
        suppressTimeoutRef.current = null;
      }
      suppressClickRef.current = true;
      suppressTimeoutRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        suppressTimeoutRef.current = null;
      }, 80);
    }

    // Resume auto-movement from the position the user left off at.
    lastTimeRef.current = 0;

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: xRef.current,
      moved: false,
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }

  const slowDown = () => {
    speedRef.current = HOVER_SPEED;
  };
  const restoreSpeed = () => {
    speedRef.current = BASE_SPEED;
  };

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
      ref={carouselRef}
      className="team-carousel"
      role="region"
      aria-label="Team members carousel"
      aria-roledescription="carousel"
      onPointerDown={onPointerDown}
      onPointerEnter={slowDown}
      onPointerLeave={restoreSpeed}
    >
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
  );
}