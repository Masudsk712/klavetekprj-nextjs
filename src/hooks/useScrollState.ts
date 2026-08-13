"use client";

import { useEffect, useState } from "react";

/**
 * SSR / hydration-safe scroll-state hook.
 *
 * Returns `true` once the window has scrolled past `threshold` pixels.
 * The initial value is always `false`, so the server-rendered markup and the
 * first client render are identical (no hydration mismatch). `window` is only
 * ever accessed inside `useEffect`, i.e. on the client after hydration.
 */
export function useScrollState(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);

    // Set the initial value without relying on layout-state from HTML.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
