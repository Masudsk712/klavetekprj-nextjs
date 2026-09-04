import { MetadataRoute } from "next";
import { productsPage } from "@/data/products";
import { projects, categories } from "@/data/projects";
import { blogArticles } from "@/data/blogArticles";

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

  // SEO landing pages — unique, genuinely useful local content (not thin
  // doorway pages): product guide, local supply, manufacturer, lightweight
  // blocks and price guidance.
  const seoLandingRoutes = [
    "/aac-blocks",
    "/aac-blocks-in-malda",
    "/aac-block-manufacturer-malda",
    "/lightweight-blocks",
    "/aac-blocks-price-malda",
  ];

  // Every internal blog article page rendered from src/data/blogArticles.ts.
  const blogArticleRoutes = blogArticles.map((a) => `/blog/${a.slug}`);

  const allRoutes = [
    ...staticRoutes,
    ...seoLandingRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...projectRoutes,
    ...blogArticleRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly" as const,
    priority:
      route === "" ? 1
        : seoLandingRoutes.includes(route) ? 0.9
        : route.includes("/products/") || route.includes("/projects/") ? 0.7
        : route.startsWith("/blog/") ? 0.6
        : 0.8,
  }));
}