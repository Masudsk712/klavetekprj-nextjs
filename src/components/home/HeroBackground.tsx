"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  // Show poster image if video has error or hasn't loaded yet
  const showPoster = hasError || !isVideoReady;

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Show poster image while loading or if video fails */}
      {showPoster && (
        <div
                    className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/hero-poster.webp')",
          }}
        />
      )}

      {/* Cinematic video background - only plays when ready */}
      {!hasError && (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover`}
          style={{
            objectPosition: "center 30%",
            filter: "saturate(1.1) contrast(1.05)",
          }}
          animate={{ scale: isVideoReady ? [1.02, 1, 1.02] : 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <source src="/videos/factory-hero.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Cinematic gradient overlays — light in light mode, dark/cinematic in dark mode.
          LAYER 2 in the example z-order. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/8 to-black/16 dark:from-black/60 dark:via-black/40 dark:to-black/70 transition-opacity duration-700" />

      {/* Vignette effect — lighter in light mode, cinematic in dark mode */}
            <div className="absolute inset-0 hero-vignette" />

      {/* Soft green glow accents for premium feel — slightly stronger in light mode */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 dark:bg-primary/12 rounded-full blur-3xl pointer-events-none transition-colors duration-700" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-glow/12 dark:bg-accent-glow/10 rounded-full blur-3xl pointer-events-none transition-colors duration-700" />

      {/* LAYER 3 — LIGHT THEME ONLY readability gradients.
          Placed ABOVE the cinematic/green treatment (DOM order after it) so the
          white wash brightens the content side over the footage. Sits BEHIND the
          hero content (the whole background container is -z-20 vs content z-20).
          Hidden in dark mode. */}
            <div className="absolute inset-0 hero-light-overlay dark:hidden transition-opacity duration-500" />
            <div className="absolute inset-0 hero-light-secondary dark:hidden transition-opacity duration-500" />
    </div>
  );
}
 