"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Hydration-safe "is the navbar currently over the hero?" hook.
 *
 * Detects the real hero element (tagged with `data-hero-section`) using an
 * IntersectionObserver rather than a hardcoded viewport pixel, so it works
 * consistently across every route's hero/banner. An IntersectionObserver is not
 * a scroll listener, so it does not duplicate the existing `useScrollState`
 * listener.
 *
 * - The navbar sits at the top of the page on mount, so we optimistically start
 *   at `true` (matching on both SSR and the first client render — no hydration
 *   mismatch), and the observer immediately confirms the real value.
 * - It flips to `false` once the hero has scrolled past the viewport, which
 *   lets the navbar return to its solid glass surface.
 * - It re-runs whenever the route changes so each page's hero is observed.
 *
 * State is only ever written from the IntersectionObserver callback (or a
 * deferred timer for hero-less pages), never synchronously inside the effect.
 */
export function useOverHero() {
  const [overHero, setOverHero] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const hasHero = document.querySelector<HTMLElement>("[data-hero-section]");

    if (!hasHero) {
      // No hero on this route — fall back to the solid navbar right after mount.
      const t = setTimeout(() => setOverHero(false), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(([entry]) => {
      setOverHero(entry.isIntersecting);
    });

    observer.observe(hasHero);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return overHero;
}