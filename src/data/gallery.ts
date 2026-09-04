export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  isVideo: boolean;
  poster?: string;
  videoSrc?: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  description: string;
  images: GalleryItem[];
}

/**
 * Builds a gallery entry from a real file inside `public/images/gallery/`.
 * Original file names are kept exactly as they exist on disk (casing
 * included); spaces are percent-encoded so every path resolves cleanly
 * from `/images/gallery/...`.
 */
const img = (file: string, title: string, alt: string): GalleryItem => ({
  src: `/images/gallery/${encodeURIComponent(file)}`,
  alt,
  title,
  isVideo: false,
});

export const galleryData = {
  hero: {
    title: "Our Gallery",
    subtitle:
      "A visual journey through our manufacturing facility, projects, and the team behind Klavetek.",
  },
  categories: [
    {
      id: "factory",
      title: "Factory & Infrastructure",
      description:
        "Inside the Klavetek plant in Malda — buildings, steam and air utilities, and the workspaces behind production.",
      images: [
        img("FactoryOutSideView.webp", "Factory Exterior", "Outside view of the Klavetek AAC block factory in Malda, West Bengal"),
        img("gallery-hero.webp", "Facility Overview", "Wide view across the Klavetek manufacturing facility"),
        img("OfficeRoom.webp", "Head Office", "Klavetek office with the company website on screen"),
        img("Boiler_1.webp", "Steam Boiler", "Industrial boiler generating steam for the autoclaves"),
        img("Boiler_2.webp", "Boiler House", "Boiler room equipment powering the curing process"),
        img("Boiler_3.webp", "Boiler Controls", "Boiler piping and controls inside the Klavetek plant"),
        img("Compressor_1.webp", "Air Compressor", "Air compressor unit powering plant pneumatics"),
      ],
    },
    {
      id: "machinery",
      title: "Machinery & Equipment",
      description:
        "Autoclaves, batching plants and material-handling equipment on the factory floor.",
      images: [
        img("AutoclaveMachine.webp", "Autoclave Machine", "Autoclave machine for high-pressure steam curing of AAC blocks"),
        img("batching machine_1.webp", "Batching Panel", "Operator at the computerised batching panel of the mixing plant"),
        img("batching machine_2.webp", "Batching Controls", "Automated batching machine controls at the Klavetek plant"),
        img("jcp1.webp", "Forklift Handling", "ACE forklift lifting a stack of finished AAC blocks"),
        img("jcp2.webp", "Block Handling", "ACE handling equipment moving AAC blocks across the yard"),
      ],
    },
    {
      id: "production",
      title: "Production Process",
      description:
        "Every stage — from raw material handling to finished, autoclaved blocks.",
      images: [
        img("raw-material.webp", "Raw Material Storage", "Raw material stock stored at the Klavetek plant"),
        img("mixing.webp", "Slurry Mixing", "Computer-controlled mixing of the AAC slurry"),
        img("mold.webp", "Casting Moulds", "Steel moulds prepared for AAC casting"),
        img("casting.webp", "Casting Line", "Fresh AAC slurry poured into casting moulds"),
        img("curing_1.webp", "Curing Rack", "Green AAC cakes resting in the curing racks"),
        img("curing_2.webp", "Cake Curing", "Pre-autoclave curing of moulded AAC cakes"),
        img("cutting_1.webp", "Cutting Line", "Automatic wire cutting line shaping AAC cakes"),
        img("cutting_2.webp", "Wire Cutting", "Precision multi-wire cutting of an AAC cake"),
        img("cutting_3.webp", "Precision Cutting", "Cut cakes with exact dimensions on the cutting line"),
        img("ready for AutoClaving_1.webp", "Ready for Autoclaving", "Aerated AAC cakes on rails ready for autoclaving"),
        img("ready for AutoClaving_2.webp", "Autoclave Rails", "Cakes travelling on rails towards the autoclaves"),
        img("ready for AutoClaving_3.webp", "Before Autoclaving", "Green cakes lined up in front of the autoclaves"),
        img("ready for AutoClaving_4.webp", "Loading the Autoclave", "AAC cakes being moved into the autoclave chamber"),
        img("AutoclavingReady_1.webp", "Autoclaving", "High-pressure steam curing inside the autoclave"),
        img("AutoclavingReady_2.webp", "Steam Curing", "Autoclave chamber charged with AAC cakes"),
        img("AutoclavingReady_3.webp", "Autoclave Batch", "A batch of AAC cakes inside the autoclave"),
        img("completedAutoclaved_1.webp", "Post-Autoclave", "Finished AAC cakes leaving the autoclave"),
        img("completedAutoclaved_2.webp", "Cured Cakes", "Completed autoclaved cakes ready for packing"),
      ],
    },
    {
      id: "quality",
      title: "Quality & Lab Testing",
      description:
        "In-house laboratory testing for strength, density and consistency before dispatch.",
      images: [
        img("LabRoom.webp", "Testing Laboratory", "Klavetek testing laboratory with AAC block samples and ovens"),
        img("InsideOven.webp", "Laboratory Oven Test", "AAC block specimen inside a laboratory testing oven"),
        img("Oven_1.webp", "Lab Oven", "Laboratory oven used for moisture and strength testing"),
        img("Oven_2.webp", "Oven Testing", "Block samples loaded into the laboratory oven"),
        img("Oven_3.webp", "Drying Oven", "Laboratory drying oven during a test cycle"),
        img("Oven_4.webp", "Quality Ovens", "Row of testing ovens inside the Klavetek lab"),
        img("Humidity_1.webp", "Humidity Cabinet", "Humidity cabinet for controlled curing tests"),
        img("Humidity_2.webp", "Humidity Testing", "Humidity chamber maintaining test conditions"),
        img("Certificate_1.webp", "Quality Certificate", "Klavetek quality certification on display"),
        img("Certificate_2.webp", "Certifications", "Certified quality standards of Klavetek AAC blocks"),
      ],
    },
    {
      id: "products",
      title: "Finished Products",
      description: "Klavetek AAC blocks, stacked and ready for dispatch.",
      images: [
        img("blocks_1.webp", "AAC Block Stacks", "Stacks of finished Klavetek AAC blocks at the plant"),
        img("blocks_2.webp", "Finished Blocks", "Neatly stacked Klavetek AAC blocks"),
        img("blocks_3.webp", "Block Pallets", "Palletised AAC blocks ready for dispatch"),
        img("blocks_4.webp", "Ready Stock", "Finished AAC block stock inside the Klavetek yard"),
      ],
    },
    {
      id: "delivery",
      title: "Logistics & Delivery",
      description: "Loading, dispatch and site delivery across the region.",
      images: [
        img("delivery_1.webp", "Dispatch Bay", "AAC blocks loaded at the Klavetek dispatch bay"),
        img("delivery_2.webp", "Truck Loading", "Trucks being loaded with Klavetek AAC blocks"),
        img("delivery_3.webp", "Loaded Truck", "Loaded truck leaving the Klavetek plant"),
        img("delivery_4.webp", "Fleet Dispatch", "Fleet of trucks ready for block delivery"),
        img("delivery_5.webp", "On the Road", "Klavetek AAC blocks in transit to site"),
        img("delivery_6.webp", "Site Delivery", "Klavetek AAC blocks delivered at a construction site"),
      ],
    },
    {
      id: "videos",
      title: "Videos",
      description: "Watch clips from our manufacturing facility",
      images: [
        {
          src: "/images/hero/hero-poster.webp",
          poster: "/images/hero/hero-poster.webp",
          videoSrc: "/videos/factory-hero.mp4",
          alt: "Tour of the Klavetek manufacturing facility",
          title: "Factory Tour",
          isVideo: true,
        },
      ],
    },
  ],
};

/**
 * Every photo in the gallery (videos excluded) flattened in category order.
 * The grid renders collections in exactly this order, so indexes here map
 * 1:1 onto the flat lightbox navigation list.
 */
export const allGalleryImages: GalleryItem[] = galleryData.categories
  .filter((category) => category.id !== "videos")
  .flatMap((category) => category.images);