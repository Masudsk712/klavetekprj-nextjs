/**
 * =====================================================================
 * Centralized SEO constants — single source of truth for metadata across
 * the site. Update these values in ONE place and every page follows.
 * =====================================================================
 */

export const siteUrl = "https://kgbt.in";

export const companyName = "Klavetek Green Blocks & Tiles Pvt. Ltd.";

export const brandName = "KLAVETEK";

/** Primary homepage title — full brand name + product positioning. */
export const homeTitle =
  "Klavetek Green Blocks & Tiles | Premium AAC Block";

/** Homepage meta description — focused on AAC blocks, Malda and construction use. */
export const homeDescription =
  "KLAVETEK manufactures premium autoclaved aerated concrete (AAC) blocks in Malda, West Bengal — lightweight, fire-resistant, IS 2185-compliant blocks for residential, commercial, hospital and industrial construction, supplied across West Bengal and North Bengal.";

/** Factory / business address — MUST stay consistent with src/constants/company.ts */
export const addressLocality = "Malda";
export const addressRegion = "West Bengal";
export const addressCountry = "IN";

/** Areas the factory actively serves — kept generic, no invented claims. */
export const areaServed = ["Malda", "West Bengal", "North Bengal", "Eastern India"];

/** Google Maps directions link (sourced from the existing footer embed. */
export const directionsUrl = "https://maps.app.goo.gl/Q3QJyfQnhN8PPhuq8";

/** Opening hours published in the site footer (Mon–Sat, 9:00–18:00). */
export const openingHours = { weekday: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", opens: "09:00", closes: "18:00" };