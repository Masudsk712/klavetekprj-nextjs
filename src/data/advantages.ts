export interface Advantage {
  id: string;
  title: string;
  shortSummary: string;
  icon: string;
  image: string;
  brochureContent: string;
}

export const advantages: Advantage[] = [
  {
    id: "cost-time-saving",
    title: "Cost & Time Saving",
    shortSummary: "5-6x larger blocks reduce mortar joints, lighter weight saves steel & concrete, less plaster needed, and high insulation saves energy costs.",
    icon: "Zap",
    image: "/images/features/Cost&Time-Saving.webp",
    brochureContent: `Klavetek AAC Blocks are 5–6× larger than clay bricks, reducing mortar use and speeding up construction. Their lightweight design lowers structural load, saving steel and concrete, while precision manufacturing reduces plaster requirements. Superior thermal insulation also improves energy efficiency and lowers long-term costs.`,
  },
  {
    id: "fire-resistant",
    title: "Fire Resistant",
    shortSummary: "Incombustible material withstands up to 1400°C with 4-5 hour fire rating. Essential for fire-safe construction.",
    icon: "Flame",
    image: "/images/features/fire-resistant.webp",
    brochureContent: `Made of incombustible material, fly ash, these blocks can withstand a temperature upto 1400°C and has fire rating of 4-5 hours. Hence, highly recommended in areas where fire safety is essential.`,
  },
  {
    id: "lightweight",
    title: "Lightweight",
    shortSummary: "1/3rd the weight of clay bricks with density of 550-650 kg/m³. Easier transport, labor savings, and earthquake protection.",
    icon: "Feather",
    image: "/images/features/Lightweight.webp",
    brochureContent: `Being 1/3rd in weight than clay bricks & having density of only 550-650 Kg/m3 to 2000 Kg/m3 of regular bricks, these lightweight blocks are easier to transport thus saving labor expenses & overall cost. Also, it protects from earthquakes.`,
  },
  {
    id: "pest-resistant",
    title: "Pest Resistant",
    shortSummary: "Made from inorganic ingredients, making blocks termite and pest resistant to prevent damage and losses.",
    icon: "Shield",
    image: "/images/features/Pest-Resistant.webp",
    brochureContent: `Made of inorganic ingredients, AAC Blocks are termite & pest resistant preventing damages & losses.`,
  },
  {
    id: "noise-resistant",
    title: "Noise Resistant",
    shortSummary: "STC-44 Sound Transmission Class rating makes these blocks an excellent sound barrier for peaceful environments.",
    icon: "Volume2",
    image: "/images/features/Noise-Resistant.webp",
    brochureContent: `Klavetek AAC Blocks fall in STC-44 (Sound Transmission Class) which makes it a good sound barrier.`,
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly",
    shortSummary: "Manufactured from fly ash waste, saving fertile soil and stopping air pollution for sustainable construction.",
    icon: "Leaf",
    image: "/images/features/Eco-Friendly.webp",
    brochureContent: `AAC Blocks are manufactured from fly ash ie. waste from thermal power known as 'pollutant fly ash' which saves lots of soil (of fertile land) required in making the conventional bricks and also stop air pollution. Thus, they are eco-friendly.`,
  },
  {
    id: "water-saving",
    title: "Savings in Water Consumption",
    shortSummary: "No curing water required, leading to significant water conservation during construction.",
    icon: "Droplets",
    image: "/images/features/Savings-inWaterConsumption.webp",
    brochureContent: `There is no need to water AAC Blocks for curing. Hence, savings in water consumption.`,
  },
  {
    id: "thermal-insulation",
    title: "Energy Saving Thermal Insulation",
    shortSummary: "High thermal insulation rating of 30 protects walls from external temperature changes, saving energy costs.",
    icon: "Thermometer",
    image: "/images/features/EnergySavingThermalInsulation.webp",
    brochureContent: `Having high thermal insulation of rating 30, Klavetek AAC blocks are not affected by change in external temperature on walls thus saving energy costs.`,
  },
];