export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  isVideo: boolean;
  poster?: string;
  videoSrc?: string;
}

export const galleryData = {
 hero: {
 title: "Our Gallery",
 subtitle: "A visual journey through our manufacturing facility, projects, and the team behind Klavetek.",
 },
 categories: [
 {
 id: "factory",
 title: "Factory",
 description: "Our state-of-the-art manufacturing facility in Malda, West Bengal",
 images: [
 { src: "/images/process/raw-material.webp", alt: "Raw material storage at the Klavetek facility", title: "Raw Material Storage", isVideo: false },
 { src: "/images/process/Casting.webp", alt: "AAC block casting line inside the Klavetek facility", title: "Casting Line", isVideo: false },
 { src: "/images/process/Curing.webp", alt: "Controlled curing inside the Klavetek facility", title: "Controlled Curing", isVideo: false },
 { src: "/images/process/Delivery.webp", alt: "Loading and dispatch bay at the Klavetek facility", title: "Dispatch & Delivery", isVideo: false },
 ],
 },
 {
 id: "machinery",
 title: "Machinery",
 description: "German autoclaving technology and automated production lines",
 images: [
 { src: "/images/process/Autoclaving.webp", alt: "Autoclave machine for high-pressure steam curing", title: "Autoclave Machine", isVideo: false },
 { src: "/images/process/Cutting.webp", alt: "Precision wire cutting machine", title: "Precision Cutting", isVideo: false },
 { src: "/images/process/mixing.webp", alt: "Computer-controlled automated mixing plant", title: "Automated Mixing", isVideo: false },
 { src: "/images/process/QualityCheck.webp", alt: "Quality control testing in the Klavetek facility", title: "Quality Control", isVideo: false },
 ],
 },
 {
 id: "production",
 title: "Production",
 description: "From raw material mixing to finished block packaging",
 images: [
 { src: "/images/process/raw-material.webp", alt: "Premium raw materials used for AAC production", title: "Raw Materials", isVideo: false },
 { src: "/images/process/mixing.webp", alt: "Computer-controlled slurry mixing process", title: "Mixing Process", isVideo: false },
 { src: "/images/process/Curing.webp", alt: "Final autoclave curing of finished blocks", title: "Autoclave Curing", isVideo: false },
 { src: "/images/process/QualityCheck.webp", alt: "Strict quality testing before dispatch", title: "Quality Testing", isVideo: false },
 ],
 },
 {
 id: "projects",
 title: "Projects",
 description: "Buildings and structures built with Klavetek AAC blocks",
 images: [
 { src: "/images/projects/Balurghat%20Railway%20Station.webp", alt: "Balurghat Railway Station built with Klavetek AAC blocks", title: "Balurghat Railway Station", isVideo: false },
 { src: "/images/projects/PRM-Centrepoint-Malda.webp", alt: "PRM Centrepoint Malda commercial project", title: "PRM Centrepoint Malda", isVideo: false },
 { src: "/images/projects/drl%20hospital.webp", alt: "DRL Multispeciality Hospital built with Klavetek AAC blocks", title: "DRL Multispeciality Hospital", isVideo: false },
 { src: "/images/projects/the%20growth%20career%20institute.webp", alt: "Growth Career Institute built with Klavetek AAC blocks", title: "Growth Career Institute", isVideo: false },
 ],
 },
 {
 id: "construction",
 title: "Construction Sites",
 description: "On-site application and installation of AAC blocks",
 images: [
 { src: "/images/process/Delivery.webp", alt: "Klavetek AAC blocks delivered for site application", title: "Material Delivery", isVideo: false },
 { src: "/images/process/Casting.webp", alt: "AAC blocks being handled for on-site installation", title: "On-Site Block Work", isVideo: false },
 ],
 },
 {
 id: "videos",
 title: "Videos",
 description: "Watch clips from our manufacturing facility",
 images: [
 { src: "/images/hero/hero-poster.webp", poster: "/images/hero/hero-poster.webp", videoSrc: "/videos/factory-hero.mp4", alt: "Tour of the Klavetek manufacturing facility", title: "Factory Tour", isVideo: true },
 ],
 },
 ],
};

