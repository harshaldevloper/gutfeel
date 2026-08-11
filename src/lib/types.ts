export interface Food {
  id: string;
  name: string;
  category: string;
  fodmap: "safe" | "moderate" | "high";
  fodmapType?: string[];
  servingSize?: string;
  notes?: string;
  calories?: number;
  allergens?: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  weekStart: string;
  days: DayPlan[];
  createdAt: string;
}

export interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  foods: Food[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  confidence: number;
}

export interface SymptomEntry {
  id: string;
  userId: string;
  date: string;
  severity: number;
  type: string[];
  foods: string[];
  notes?: string;
  bowelMovement?: "normal" | "constipation" | "diarrhea" | "mixed";
  stressLevel?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  ibsType: "IBS-D" | "IBS-C" | "IBS-M" | "IBS-U";
  allergies: string[];
  dietaryPreference: string[];
  cookingSkill: "beginner" | "intermediate" | "advanced";
  mealsPerDay: number;
  budget: "low" | "medium" | "high";
  householdSize: number;
  phase: "elimination" | "reintroduction" | "personalization";
}
