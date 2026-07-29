import HeroSection from "@/components/home/HeroSection";
import { company } from "@/constants/company";

export default function ContactPage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Get in Touch
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Have a question or need more information? Reach out to us and our
                team will get back to you as soon as possible.
              </p>

              <div className="mt-6 space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Phone:</span>{" "}
                  <a href={`tel:${company.phone}`} className="hover:text-green-600">
                    {company.phone}
                  </a>
                </p>

                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Email:</span>{" "}
                  <a href={`mailto:${(company as { email?: string }).email || "info@klavetek.com"}`} className="hover:text-green-600">
                    {(company as { email?: string }).email || "info@klavetek.com"}
                  </a>
                </p>

                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Address:</span>{" "}
                  Klavetek Green Blocks & Tiles Pvt. Ltd., India
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Send us a Message
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Fill out the form and we will get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}