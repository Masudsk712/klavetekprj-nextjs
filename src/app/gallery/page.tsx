import HeroSection from "@/components/home/HeroSection";

export default function GalleryPage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gallery
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Browse through our project gallery and see our work in action.
          </p>
        </div>
      </section>
    </>
  );
}