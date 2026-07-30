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

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Vignette effect for cinematic look */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8)',
        }}
      />
    </div>
  );
}
