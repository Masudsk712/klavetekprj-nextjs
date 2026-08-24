"use client";

import { useEffect, useState } from "react";

/**
 * SSR / hydration-safe scroll-state hook.
 *
 * Returns `true` once the window has scrolled past `threshold` pixels.
 * The initial value is always `false`, so the server-rendered markup and the
 * first client render are identical (no hydration mismatch). `window` is only
 * ever accessed inside `useEffect`, i.e. on the client after hydration.
 *
 * NOTE: `window.scrollY` is not a real API and silently returns `undefined`,
 * which previously broke both the navbar glass state and the scroll-to-top
 * control. The correct cross-browser source of the viewport's vertical scroll
 * position is `document.scrollingElement.scrollTop`.
 */
export function useScrollState(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = document.scrollingElement?.scrollTop ?? 0;
      setScrolled(y > threshold);
    };

    // Set the initial value without relying on layout-state from HTML.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also fire once in case a page loads already-scrolled (anchors/hash).
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return scrolled;
}
