import HeroSection from "@/components/home/HeroSection";

export default function CareerPage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Careers
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Join our team and be part of a growing organization that values
            innovation, quality, and people.
          </p>
        </div>
      </section>
    </>
  );
}