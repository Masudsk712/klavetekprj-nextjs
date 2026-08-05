export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  size: string;
  title: string;
  tagline: string;
  description: string;
  specs: Spec[];
  advantages: string[];
  applications: string[];
}

export interface ProductsPage {
  hero: {
    title: string;
    subtitle: string;
  };
  products: Product[];
  brochureCta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}