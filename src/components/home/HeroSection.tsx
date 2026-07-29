import HeroBackground from "./HeroBackground";
import HeroOverlay from "./HeroOverlay";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero/hero-poster.webp')" }} />

      <HeroBackground />

      <div className="relative z-20 flex min-h-screen items-center">
        <HeroContent />
      </div>

      <ScrollIndicator />

    </section>
  );
}
