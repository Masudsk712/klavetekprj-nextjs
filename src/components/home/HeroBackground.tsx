"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleCanPlay = () => setLoaded(true);

    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {!loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: "url('/images/hero/hero-poster.webp')",
          }}
        />
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ${
          loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
      >
        <source src="/videos/factory-hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
