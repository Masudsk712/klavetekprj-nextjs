import { productsPage } from "./products";
import { technicalSpecs } from "./home";
import type { Product } from "@/types";

/**
 * =====================================================================
 *  PRODUCT CATALOGUE — CENTRALIZED CONTENT (REDESIGNED)
 * ---------------------------------------------------------------------
 *  Trimmed to only the exports used by the redesigned product page.
 *  All technical values are sourced from EXISTING project data.
 *
 *  - Per-size specifications -> ./products  (productsPage.products[*].specs)
 *  - Common technical specs   -> ./home       (technicalSpecs)
 * =====================================================================
 */

/** The full product list (reused directly from products data). */
export const productThicknesses: Product[] = productsPage.products;

/** Product image path for a given size, e.g. "150mm" -> product-150.webp */
export function productImage(size: string): string {
  return `/images/products/product-${size.replace("mm", "")}.webp`;
}

/** Re-export shared technical specs for the specifications table. */
export { technicalSpecs };