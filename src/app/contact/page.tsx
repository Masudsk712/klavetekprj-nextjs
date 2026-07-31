import { Metadata } from "next";
import InternalHero from "@/components/shared/InternalHero";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
 title: "Contact Us | Klavetek Green Blocks & Tiles",
 description: "Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support. Located in Malda, West Bengal.",
};

export default function ContactPage() {
  return (
    <>
  <InternalHero
    title="Contact Us"
    subtitle="Get in touch with Klavetek for AAC block inquiries, price quotes, and technical support. Located in Malda, West Bengal."
    backgroundImage="/images/contact/contact-hero.webp"
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Contact" }
    ]}
  />
  <ContactContent />
 </>
 );
}