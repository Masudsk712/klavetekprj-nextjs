import HeroSection from "@/components/home/HeroSection";
import { company } from "@/constants/company";

export default function AboutPage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                About Us
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {company.name} is a leading manufacturer of premium AAC blocks and
                construction solutions. Established with a vision to revolutionize
                the construction industry, we are committed to providing
                sustainable, eco-friendly, and high-quality building materials.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Our Mission
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                To deliver innovative construction solutions that combine
                sustainability, durability, and affordability, empowering
                builders and developers to create lasting structures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}