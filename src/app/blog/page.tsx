import HeroSection from "@/components/home/HeroSection";

export default function BlogPage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog & Insights
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Stay updated with the latest trends, insights, and news from the
            construction industry.
          </p>
        </div>
      </section>
    </>
  );
}