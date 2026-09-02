import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection() {
 return (
 <section
  data-hero-section
  className="relative overflow-hidden pt-[calc(var(--navbar-height,80px)+36px)] md:pt-[calc(var(--navbar-height,80px)+48px)] lg:pt-[calc(var(--navbar-height,80px)+56px)]"
 >
 {/* The fixed PremiumNavbar bar is 80px tall at the top of the page (--navbar-height).
     The section's top padding = navbar height + a premium gutter at every
     breakpoint, so the hero badge/heading/buttons always start BELOW the navbar. */}

 <HeroBackground />

  <div className="relative z-20 flex items-center min-h-[calc(100vh-var(--navbar-height,80px)-36px)] md:min-h-[calc(100vh-var(--navbar-height,80px)-48px)] lg:min-h-[calc(100vh-var(--navbar-height,80px)-56px)]">

  {/* The min-height subtracts exactly the same padding as above, keeping the hero
      exactly one viewport tall while the content is centred in the space BELOW the
      fixed navbar. On very short viewports (small windows / browser zoom) the
      min-height grows with the content, so the content top stays anchored below the
      navbar and can never slide up underneath it. */}
  <HeroContent />
  </div>

 <ScrollIndicator />

 {/* HeroOverlay placeholder removed: unused component */}
 </section>
 );
}
