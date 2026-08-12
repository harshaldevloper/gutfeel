export type MealSlot = "breakfast" | "lunch" | "dinner";

export interface MealOption {
  id: string;
  name: string;
  slot: MealSlot;
  description: string;
  ingredients: string[];
  cookMinutes: number;
  calories: number;
  baseSafe: number;
}

export const MEAL_OPTIONS: MealOption[] = [
  // Breakfast
  {
    id: "b1",
    name: "Paneer Bhurji with Rice Toast",
    slot: "breakfast",
    description: "Crumbled paneer sautéed with tomato and turmeric, served with a toasted rice chapati.",
    ingredients: ["Paneer", "Tomato", "Turmeric", "White Rice", "Cumin", "Spinach"],
    cookMinutes: 12,
    calories: 420,
    baseSafe: 96,
  },
  {
    id: "b2",
    name: "Oatmeal with Banana & Peanut Butter",
    slot: "breakfast",
    description: "Creamy oats topped with sliced banana, a spoon of peanut butter, and a drizzle of maple syrup.",
    ingredients: ["Oats", "Banana", "Peanut Butter", "Maple Syrup"],
    cookMinutes: 6,
    calories: 390,
    baseSafe: 94,
  },
  {
    id: "b3",
    name: "Scrambled Eggs & Spinach with Pepper",
    slot: "breakfast",
    description: "Fluffy eggs with wilted spinach and sautéed bell pepper. High protein, gentle on the gut.",
    ingredients: ["Eggs", "Spinach", "Bell Pepper", "Butter"],
    cookMinutes: 8,
    calories: 310,
    baseSafe: 93,
  },
  {
    id: "b4",
    name: "Moong Dal Chilla with Curd",
    slot: "breakfast",
    description: "Savory green-gram crepe served with cool curd. Moderate GOS — eat a small serving to test tolerance.",
    ingredients: ["Dal (Moong)", "Cumin", "Turmeric", "Curd (Dahi)"],
    cookMinutes: 15,
    calories: 350,
    baseSafe: 82,
  },
  {
    id: "b5",
    name: "Coconut Rice Bowl with Papaya",
    slot: "breakfast",
    description: "Fluffy rice simmered in light coconut milk with fresh papaya on the side.",
    ingredients: ["White Rice", "Coconut Milk", "Papaya", "Olive Oil"],
    cookMinutes: 15,
    calories: 430,
    baseSafe: 92,
  },

  // Lunch
  {
    id: "l1",
    name: "Lemon Herb Chicken with Rice & Cucumber Raita",
    slot: "lunch",
    description: "Grilled chicken with lemon and herbs over white rice, plus a cooling cucumber curd raita.",
    ingredients: ["Chicken Breast", "White Rice", "Cucumber", "Curd (Dahi)", "Lettuce"],
    cookMinutes: 20,
    calories: 560,
    baseSafe: 97,
  },
  {
    id: "l2",
    name: "Grilled Fish with Roasted Potato & Carrot",
    slot: "lunch",
    description: "Pan-seared salmon with herb-roasted potatoes and carrots. Rich in omega-3s, low FODMAP.",
    ingredients: ["Salmon", "Potato", "Carrot", "Olive Oil", "Lettuce"],
    cookMinutes: 22,
    calories: 540,
    baseSafe: 95,
  },
  {
    id: "l3",
    name: "Paneer Tikka Wrap with Bell Peppers",
    slot: "lunch",
    description: "Charred paneer tikka (no garlic, no onion) wrapped with grilled bell pepper and lettuce.",
    ingredients: ["Paneer", "Bell Pepper", "Tomato", "Lettuce", "Turmeric"],
    cookMinutes: 18,
    calories: 500,
    baseSafe: 92,
  },
  {
    id: "l4",
    name: "Quinoa Bowl with Chicken & Spinach",
    slot: "lunch",
    description: "Light quinoa with shredded chicken, baby spinach, and a squeeze of lime with olive oil.",
    ingredients: ["Quinoa", "Chicken Breast", "Spinach", "Olive Oil"],
    cookMinutes: 18,
    calories: 520,
    baseSafe: 94,
  },
  {
    id: "l5",
    name: "Moong Dal Khichdi with Bottle Gourd",
    slot: "lunch",
    description: "Comforting rice and moong dal khichdi with soft bottle gourd. Moderate GOS — test in small portions.",
    ingredients: ["White Rice", "Dal (Moong)", "Bottle Gourd (Lauki)", "Turmeric", "Cumin"],
    cookMinutes: 25,
    calories: 480,
    baseSafe: 80,
  },

  // Dinner
  {
    id: "d1",
    name: "Lemon Herb Salmon with Sweet Potato",
    slot: "dinner",
    description: "Roasted salmon with caramelized sweet potato and zucchini ribbons.",
    ingredients: ["Salmon", "Sweet Potato", "Zucchini", "Olive Oil"],
    cookMinutes: 25,
    calories: 520,
    baseSafe: 96,
  },
  {
    id: "d2",
    name: "Chicken Zucchini Stir-fry with Rice",
    slot: "dinner",
    description: "Quick stir-fried chicken with zucchini and bell pepper over steamed white rice.",
    ingredients: ["Chicken Breast", "Zucchini", "Bell Pepper", "White Rice", "Olive Oil"],
    cookMinutes: 15,
    calories: 500,
    baseSafe: 94,
  },
  {
    id: "d3",
    name: "Egg Fried Rice with Carrots & Peppers",
    slot: "dinner",
    description: "Scrambled eggs tossed with cold rice, carrots, and bell pepper with a splash of tamari.",
    ingredients: ["Eggs", "White Rice", "Carrot", "Bell Pepper"],
    cookMinutes: 12,
    calories: 470,
    baseSafe: 93,
  },
  {
    id: "d4",
    name: "Tofu Coconut Curry with Rice",
    slot: "dinner",
    description: "Silken tofu simmered in light coconut curry with spinach and turmeric, over rice.",
    ingredients: ["Tofu", "Coconut Milk", "Spinach", "Turmeric", "White Rice"],
    cookMinutes: 20,
    calories: 480,
    baseSafe: 91,
  },
  {
    id: "d5",
    name: "Grilled Chicken with Mashed Potato",
    slot: "dinner",
    description: "Herb-grilled chicken with buttery mashed potatoes and roasted carrots.",
    ingredients: ["Chicken Breast", "Potato", "Carrot", "Butter", "Olive Oil"],
    cookMinutes: 24,
    calories: 540,
    baseSafe: 92,
  },
];

export interface DailyPlan {
  slots: Record<MealSlot, MealOption>;
  score: number;
  personalized: boolean;
  avoidedTriggers: string[];
}

const SLOTS: MealSlot[] = ["breakfast", "lunch", "dinner"];

export function mealsForSlot(slot: MealSlot): MealOption[] {
  return MEAL_OPTIONS.filter(m => m.slot === slot);
}

export function buildDailyPlan(triggeredFoods: string[] = []): DailyPlan {
  const pickBest = (slot: MealSlot, triggered: string[], excludeId?: string): MealOption => {
    const triggeredLower = triggered.map(t => t.toLowerCase());
    const options = mealsForSlot(slot).filter(
      m => m.id !== excludeId && !m.ingredients.some(i => triggeredLower.includes(i.toLowerCase()))
    );
    const pool = options.length > 0 ? options : mealsForSlot(slot).filter(m => m.id !== excludeId);
    return pool.reduce((best, cur) => (cur.baseSafe > best.baseSafe ? cur : best));
  };

  const slotsOfPlan = { breakfast: pickBest("breakfast", []), lunch: pickBest("lunch", []), dinner: pickBest("dinner", []) } as Record<MealSlot, MealOption>;
  const avoidedTriggers = triggeredFoods.filter(trigger => {
    const t = trigger.toLowerCase();
    return SLOTS.every(s => !slotsOfPlan[s].ingredients.some(i => i.toLowerCase() === t));
  });
  const avg = SLOTS.reduce((sum, s) => sum + slotsOfPlan[s].baseSafe, 0) / SLOTS.length;
  const personalized = triggeredFoods.length > 0;
  return { slots: slotsOfPlan, score: Math.round(avg), personalized, avoidedTriggers };
}

export function swapMeal(slot: MealSlot, currentId: string, triggered: string[]): MealOption {
  const triggeredLower = triggered.map(t => t.toLowerCase());
  const candidates = mealsForSlot(slot).filter(
    m => m.id !== currentId && !m.ingredients.some(i => triggeredLower.includes(i.toLowerCase()))
  );
  if (candidates.length === 0) {
    const fallback = mealsForSlot(slot).filter(m => m.id !== currentId);
    return fallback.length > 0 ? fallback[0] : mealsForSlot(slot)[0];
  }
  const idx = candidates.findIndex(m => m.id === currentId);
  return candidates[(idx + 1) % candidates.length];
}

export function mealSafePercent(meal: MealOption, triggered: string[]): number {
  const penalized = triggered.some(t => meal.ingredients.some(i => i.toLowerCase() === t.toLowerCase())) ? 15 : 0;
  return Math.max(50, meal.baseSafe - penalized);
}