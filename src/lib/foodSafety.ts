export interface FoodSafetyAlert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  category: "adulteration" | "hygiene" | "expired" | "fake" | "recall" | "chemical";
  region: string;
  date: string;
  action?: string;
  source?: string;
}

export interface RestaurantSafety {
  name: string;
  area: string;
  rating: number;
  lastInspection: string;
  status: "passed" | "failed" | "pending" | "suspended";
  violations?: string[];
}

// FSSAI/FDA India Food Safety Data
export const FOOD_SAFETY_ALERTS: FoodSafetyAlert[] = [
  {
    id: "fda1",
    title: "Milk Adulteration Raids in Pune",
    description: "FDA seized 2,000 liters of adulterated milk containing detergent and urea. Suppliers in Pune district booked under FSSAI Act.",
    severity: "critical",
    category: "adulteration",
    region: "Pune",
    date: "2026-07-28",
    action: "Avoid loose milk from unverified sources. Buy FSSAI licensed brands only.",
    source: "Maharashtra FDA"
  },
  {
    id: "fda2",
    title: "Mumbai Restaurants Face License Suspension",
    description: "FDA suspended licenses of 5 high-profile clubs including Cricket Club of India and Juhu Gymkhana for cockroach and fly infestation.",
    severity: "high",
    category: "hygiene",
    region: "Mumbai",
    date: "2026-07-28",
    action: "Check restaurant FSSAI license before dining. Report hygiene issues to FDA.",
    source: "Maharashtra FDA"
  },
  {
    id: "fda3",
    title: "Spice Adulteration: Artificial Colors Detected",
    popular_brands: ["Turmeric", "Red Chili Powder", "Coriander Powder"],
    description: "FDA testing reveals harmful artificial colors (Rhodamine B, Metanil Yellow) in popular spice brands across Maharashtra.",
    severity: "high",
    category: "chemical",
    region: "Maharashtra",
    date: "2026-07-20",
    action: "Buy only FSSAI certified spices. Look for FSSAI logo and license number.",
    source: "FSSAI"
  },
  {
    id: "fda4",
    title: "Synthetic Cheese Seized in Nagpur",
    description: "FDA raided manufacturing units producing synthetic cheese using palm oil and artificial flavoring. 500kg seized.",
    severity: "critical",
    category: "fake",
    region: "Nagpur",
    date: "2026-07-18",
    action: "Check cheese ingredients. Real cheese lists 'milk' as first ingredient.",
    source: "Maharashtra FDA"
  },
  {
    id: "fda5",
    title: "Water Packaging Units Using Unsafe Plastic",
    description: "FDA found packaged drinking water units using non-food-grade plastic. 10,000 bottles seized in Thane district.",
    severity: "medium",
    category: "chemical",
    region: "Thane",
    date: "2026-07-15",
    action: "Buy BIS certified packaged water. Check for ISI mark.",
    source: "Maharashtra FDA"
  },
  {
    id: "fda6",
    title: "Fruits Ripened with Calcium Carbide Banned",
    description: "FDA seized 5 tonnes of artificially ripened bananas and mangoes using calcium carbide in Navi Mumbai market.",
    severity: "high",
    category: "chemical",
    region: "Navi Mumbai",
    date: "2026-07-12",
    action: "Avoid out-of-season fruits. Naturally ripened fruits have uneven color.",
    source: "Maharashtra FDA"
  },
  {
    id: "fda7",
    title: "Honey Brands Found Adulterated with Sugar Syrup",
    description: "FSSAI testing reveals 70% of cheap honey brands contain rice syrup and sugar. Only 30% passed purity tests.",
    severity: "medium",
    category: "adulteration",
    region: "India",
    date: "2026-07-10",
    action: "Buy FSSAI certified honey. Pure honey doesn\'t dissolve completely in water.",
    source: "FSSAI"
  },
  {
    id: "fda8",
    title: "Edible Oil Adulteration: Argemone Oil Mixing",
    description: "FDA raids reveal mustard oil adulterated with argemone oil causing epidemic dropsy. Seized in Solapur.",
    severity: "critical",
    category: "adulteration",
    region: "Solapur",
    date: "2026-07-08",
    action: "Buy FSSAI licensed oils only. Check for AGMARK certification.",
    source: "Maharashtra FDA"
  }
];

// Food Safety Score for common foods (FSSAI compliance based)
export const FOOD_SAFETY_SCORES: Record<string, { score: number; tips: string }> = {
  "Milk": { score: 65, tips: "Always buy pasteurized, FSSAI licensed brands. Avoid loose milk." },
  "Paneer": { score: 70, tips: "Check manufacturing date. Buy from FSSAI licensed dairies only." },
  "Rice": { score: 85, tips: "Wash thoroughly. Buy from reputed FSSAI certified mills." },
  "Wheat": { score: 80, tips: "Check for AGMARK. Avoid discolored or moist flour." },
  "Turmeric": { score: 55, tips: "Buy whole spices and grind at home. Avoid bright yellow powder." },
  "Red Chili Powder": { score: 50, tips: "Buy whole chilies and grind. Artificial colors common in cheap powder." },
  "Chicken": { score: 60, tips: "Buy from licensed shops. Check for FSSAI mark. Avoid bright pink color." },
  "Fish": { score: 65, tips: "Buy fresh from trusted sellers. Check eyes and gills for freshness." },
  "Banana": { score: 75, tips: "Naturally ripened is best. Avoid out-of-season bright yellow bananas." },
  "Apple": { score: 70, tips: "Wash thoroughly. Peel if wax coating visible." },
  "Honey": { score: 45, tips: "Buy FSSAI certified brands. Cheap honey often adulterated with sugar syrup." },
  "Cheese": { score: 55, tips: "Check ingredients. Real cheese lists milk as first ingredient." },
};

// Restaurant safety guide for users
export const RESTAURANT_SAFETY_TIPS = [
  "Check for FSSAI license displayed at the restaurant",
  "Look for hygiene rating (Grade A/B/C) if available",
  "Avoid places with visible pest issues",
  "Check if staff handles food with gloves",
  "Ensure hot food is served hot (above 60°C)",
  "Avoid raw salads at questionable places",
  "Check drinking water source (ISI mark on packaged water)",
  "Verify milk products are from licensed dairies",
];

// Get safety alert by region
export function getAlertsByRegion(region: string): FoodSafetyAlert[] {
  return FOOD_SAFETY_ALERTS.filter(
    a => a.region.toLowerCase() === region.toLowerCase() || a.region === "India"
  );
}

// Get food safety score
export function getFoodSafetyScore(foodName: string): { score: number; tips: string } | null {
  return FOOD_SAFETY_SCORES[foodName] || null;
}

// Get severity color
export function getSeverityColor(severity: FoodSafetyAlert["severity"]): string {
  switch (severity) {
    case "critical": return "bg-red-100 text-red-800 border-red-300";
    case "high": return "bg-orange-100 text-orange-800 border-orange-300";
    case "medium": return "bg-amber-100 text-amber-800 border-amber-300";
    case "low": return "bg-emerald-100 text-emerald-800 border-emerald-300";
  }
}
