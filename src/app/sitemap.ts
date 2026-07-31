import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl = "https://kgbt.in";
 const lastModified = new Date();

 const routes = [
 "",
 "/about",
 "/products",
 "/gallery",
 "/blog",
 "/career",
 "/contact",
 ];

 return routes.map((route) => ({
 url: `${baseUrl}${route}`,
 lastModified,
 changeFrequency: route === "" ? "weekly" : "monthly",
 priority: route === "" ? 1 : 0.8,
 }));
}