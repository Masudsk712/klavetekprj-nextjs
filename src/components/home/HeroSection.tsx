import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection() {
 return (
 <section className="relative overflow-hidden pt-[90px] md:pt-[110px] lg:pt-[120px]">

 <HeroBackground />

 <div className="relative z-20 flex items-center">
 <HeroContent />
 </div>

 <ScrollIndicator />

 {/* HeroOverlay placeholder removed: unused component */}
 </section>
 );
}
