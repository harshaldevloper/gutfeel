import type { UserProfile } from "./storage";

const ALLERGY_AVOID: Record<string, string[]> = {
  Gluten: [],
  Dairy: ["Paneer", "Curd (Dahi)", "Butter"],
  Nuts: ["Peanut Butter"],
  Soy: ["Tofu"],
  Eggs: ["Eggs"],
  Shellfish: ["Salmon"],
};

const DIET_AVOID: Record<string, string[]> = {
  Vegetarian: ["Chicken Breast", "Salmon"],
  Vegan: ["Chicken Breast", "Salmon", "Paneer", "Curd (Dahi)", "Butter", "Eggs"],
  Pescatarian: ["Chicken Breast"],
  Halal: [],
  Kosher: [],
};

export function mergeAvoidList(triggeredFoods: string[], profile: UserProfile | null): string[] {
  const items = [...triggeredFoods];
  for (const a of profile?.allergies ?? []) {
    items.push(...(ALLERGY_AVOID[a] ?? []));
  }
  for (const d of profile?.diets ?? []) {
    items.push(...(DIET_AVOID[d] ?? []));
  }
  return [...new Set(items)];
}
