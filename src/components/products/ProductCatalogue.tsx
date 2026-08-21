"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { productThicknesses } from "@/data/productCatalogue";
import ProductExplorer from "./ProductExplorer";
import ProductSpecifications from "./ProductSpecifications";
import ProductApplications from "./ProductApplications";
import ProductComparison from "./ProductComparison";
import ProductCTA from "./ProductCTA";

const THICKNESSES: Product[] = productThicknesses;

/** True once the client has mounted and synced the URL hash to state. */
const useHashSync = (setIndex: (i: number) => void) => {
  useEffect(() => {
    const sync = () => {
      const hash =
        typeof window !== "undefined"
          ? window.location.hash.replace("#", "")
          : "";
      const idx = THICKNESSES.findIndex((p) => p.id === hash);
      if (idx >= 0) setIndex(idx);
    };
    sync(); // sync immediately on mount
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [setIndex]);
};

/**
 * ProductCatalogue — single client boundary that owns the selected
 * thickness and synchronizes it with the URL hash so links remain
 * shareable and navigable via the Back button.
 *
 * Composes the redesigned, lean product page sections in order.
 */
export default function ProductCatalogue() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  useHashSync(setSelectedIndex);
  const selectedProduct = THICKNESSES[selectedIndex];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.hash = THICKNESSES[index].id;
      window.history.pushState(null, "", url);
    }
  };

  return (
    <>
      <ProductExplorer
        products={THICKNESSES}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />
      <ProductSpecifications product={selectedProduct} />
      <ProductApplications />
      <ProductComparison highlightId={selectedProduct.id} />
      <ProductCTA />
    </>
  );
}