import { MetadataRoute } from "next";
import { productsPage } from "@/data/products";
import { projects, categories } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kgbt.in";
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/projects",
    "/gallery",
    "/blog",
    "/career",
    "/contact",
  ];

  // Every product detail page (100mm / 125mm / 150mm / 200mm / 250mm).
  const productRoutes = productsPage.products.map((p) => `/products/${p.id}`);

  // Every project category listing page, plus each individual project detail page.
  const categoryRoutes = categories.map((c) => `/projects/${c.key}`);
  const projectRoutes = Object.entries(projects).flatMap(([category, list]) =>
    list.map((p) => `/projects/${category}/${p.slug}`)
  );

  const allRoutes = [...staticRoutes, ...productRoutes, ...categoryRoutes, ...projectRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly" as const,
    priority: route === "" ? 1 : route.includes("/products/") || route.includes("/projects/") ? 0.7 : 0.8,
  }));
}