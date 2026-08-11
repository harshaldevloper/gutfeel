export interface Food {
  id: string;
  name: string;
  category: string;
  fodmap: "safe" | "moderate" | "high";
  fodmapType?: string[];
  countries: string[];
  calories?: number;
  servingSize?: string;
}

export const FOODS: Food[] = [
  // === INDIA ===
  { id: "in1", name: "White Rice", category: "grain", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 206, servingSize: "1 cup cooked" },
  { id: "in2", name: "Brown Rice", category: "grain", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 216, servingSize: "1 cup cooked" },
  { id: "in3", name: "Roti (Chapati)", category: "grain", fodmap: "high", fodmapType: ["fructans"], countries: ["IN"], calories: 120, servingSize: "1 medium" },
  { id: "in4", name: "Dal (Moong)", category: "protein", fodmap: "moderate", fodmapType: ["GOS"], countries: ["IN"], calories: 150, servingSize: "1 cup cooked" },
  { id: "in5", name: "Dal (Masoor)", category: "protein", fodmap: "high", fodmapType: ["GOS"], countries: ["IN"], calories: 180, servingSize: "1 cup cooked" },
  { id: "in6", name: "Paneer", category: "protein", fodmap: "safe", countries: ["IN"], calories: 265, servingSize: "100g" },
  { id: "in7", name: "Buttermilk", category: "dairy", fodmap: "moderate", fodmapType: ["lactose"], countries: ["IN"], calories: 40, servingSize: "1 cup" },
  { id: "in8", name: "Curd (Dahi)", category: "dairy", fodmap: "safe", countries: ["IN"], calories: 100, servingSize: "1 cup" },
  { id: "in9", name: "Bottle Gourd (Lauki)", category: "vegetable", fodmap: "safe", countries: ["IN"], calories: 15, servingSize: "1 cup" },
  { id: "in10", name: "Okra (Bhindi)", category: "vegetable", fodmap: "safe", countries: ["IN"], calories: 33, servingSize: "1 cup" },
  { id: "in11", name: "Potato", category: "vegetable", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 161, servingSize: "1 medium" },
  { id: "in12", name: "Tomato", category: "vegetable", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 22, servingSize: "1 medium" },
  { id: "in13", name: "Carrot", category: "vegetable", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 52, servingSize: "1 cup" },
  { id: "in14", name: "Spinach", category: "vegetable", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 7, servingSize: "1 cup raw" },
  { id: "in15", name: "Banana", category: "fruit", fodmap: "safe", countries: ["IN", "UK", "US", "AU"], calories: 105, servingSize: "1 medium" },
  { id: "in16", name: "Papaya", category: "fruit", fodmap: "safe", countries: ["IN"], calories: 60, servingSize: "1 cup" },
  { id: "in17", name: "Guava", category: "fruit", fodmap: "safe", countries: ["IN"], calories: 38, servingSize: "1 medium" },
  { id: "in18", name: "Onion", category: "vegetable", fodmap: "high", fodmapType: ["fructans"], countries: ["IN", "UK", "US", "AU"], calories: 44, servingSize: "1 medium" },
  { id: "in19", name: "Garlic", category: "vegetable", fodmap: "high", fodmapType: ["fructans"], countries: ["IN", "UK", "US", "AU"], calories: 4, servingSize: "1 clove" },
  { id: "in20", name: "Cumin", category: "spice", fodmap: "safe", countries: ["IN"], calories: 8, servingSize: "1 tsp" },
  { id: "in21", name: "Turmeric", category: "spice", fodmap: "safe", countries: ["IN"], calories: 8, servingSize: "1 tsp" },
  { id: "in22", name: "Asafoetida (Hing)", category: "spice", fodmap: "high", fodmapType: ["fructans"], countries: ["IN"], calories: 10, servingSize: "1/4 tsp" },

  // === UK ===
  { id: "uk1", name: "White Bread", category: "grain", fodmap: "high", fodmapType: ["fructans"], countries: ["UK", "US", "AU"], calories: 80, servingSize: "1 slice" },
  { id: "uk2", name: "Sourdough Bread", category: "grain", fodmap: "safe", countries: ["UK", "AU"], calories: 90, servingSize: "1 slice" },
  { id: "uk3", name: "Pasta", category: "grain", fodmap: "high", fodmapType: ["fructans"], countries: ["UK", "US", "AU"], calories: 220, servingSize: "1 cup cooked" },
  { id: "uk4", name: "Oats", category: "grain", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 154, servingSize: "1 cup cooked" },
  { id: "uk5", name: "Baked Beans", category: "protein", fodmap: "high", fodmapType: ["GOS"], countries: ["UK", "US"], calories: 240, servingSize: "1 cup" },
  { id: "uk6", name: "Eggs", category: "protein", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 78, servingSize: "1 large" },
  { id: "uk7", name: "Chicken Breast", category: "protein", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 165, servingSize: "100g" },
  { id: "uk8", name: "Salmon", category: "protein", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 208, servingSize: "100g" },
  { id: "uk9", name: "Cheddar Cheese", category: "dairy", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 113, servingSize: "1 oz" },
  { id: "uk10", name: "Milk (Cow)", category: "dairy", fodmap: "high", fodmapType: ["lactose"], countries: ["UK", "US", "AU", "IN"], calories: 149, servingSize: "1 cup" },
  { id: "uk11", name: "Lactose-free Milk", category: "dairy", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 130, servingSize: "1 cup" },
  { id: "uk12", name: "Yogurt", category: "dairy", fodmap: "moderate", fodmapType: ["lactose"], countries: ["UK", "US", "AU", "IN"], calories: 100, servingSize: "1 cup" },
  { id: "uk13", name: "Apple", category: "fruit", fodmap: "high", fodmapType: ["fructose", "sorbitol"], countries: ["UK", "US", "AU"], calories: 95, servingSize: "1 medium" },
  { id: "uk14", name: "Pear", category: "fruit", fodmap: "high", fodmapType: ["fructose", "sorbitol"], countries: ["UK", "US", "AU"], calories: 102, servingSize: "1 medium" },
  { id: "uk15", name: "Broccoli", category: "vegetable", fodmap: "moderate", fodmapType: ["fructans"], countries: ["UK", "US", "AU"], calories: 55, servingSize: "1 cup" },
  { id: "uk16", name: "Cauliflower", category: "vegetable", fodmap: "high", fodmapType: ["polyols"], countries: ["UK", "US", "AU", "IN"], calories: 25, servingSize: "1 cup" },
  { id: "uk17", name: "Cucumber", category: "vegetable", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 16, servingSize: "1 cup" },
  { id: "uk18", name: "Bell Pepper", category: "vegetable", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 31, servingSize: "1 medium" },
  { id: "uk19", name: "Zucchini", category: "vegetable", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 19, servingSize: "1 cup" },
  { id: "uk20", name: "Strawberries", category: "fruit", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 50, servingSize: "1 cup" },
  { id: "uk21", name: "Blueberries", category: "fruit", fodmap: "safe", countries: ["UK", "US", "AU"], calories: 85, servingSize: "1 cup" },
  { id: "uk22", name: "Orange", category: "fruit", fodmap: "safe", countries: ["UK", "US", "AU", "IN"], calories: 62, servingSize: "1 medium" },

  // === US ===
  { id: "us1", name: "Corn", category: "vegetable", fodmap: "moderate", fodmapType: ["sorbitol"], countries: ["US"], calories: 130, servingSize: "1 cup" },
  { id: "us2", name: "Ground Beef", category: "protein", fodmap: "safe", countries: ["US", "AU"], calories: 250, servingSize: "100g" },
  { id: "us3", name: "Turkey", category: "protein", fodmap: "safe", countries: ["US"], calories: 135, servingSize: "100g" },
  { id: "us4", name: "Peanut Butter", category: "protein", fodmap: "safe", countries: ["US", "AU"], calories: 190, servingSize: "2 tbsp" },
  { id: "us5", name: "Honey", category: "sweetener", fodmap: "high", fodmapType: ["fructose"], countries: ["US", "UK", "AU"], calories: 64, servingSize: "1 tbsp" },
  { id: "us6", name: "Maple Syrup", category: "sweetener", fodmap: "safe", countries: ["US", "UK", "AU"], calories: 52, servingSize: "1 tbsp" },
  { id: "us7", name: "Avocado", category: "fruit", fodmap: "moderate", fodmapType: ["sorbitol"], countries: ["US", "AU"], calories: 240, servingSize: "1 medium" },
  { id: "us8", name: "Grapes", category: "fruit", fodmap: "safe", countries: ["US", "UK", "AU"], calories: 100, servingSize: "1 cup" },
  { id: "us9", name: "Watermelon", category: "fruit", fodmap: "high", fodmapType: ["fructans"], countries: ["US", "IN"], calories: 46, servingSize: "1 cup" },
  { id: "us10", name: "Olive Oil", category: "fat", fodmap: "safe", countries: ["US", "UK", "AU", "IN"], calories: 119, servingSize: "1 tbsp" },
  { id: "us11", name: "Butter", category: "fat", fodmap: "safe", countries: ["US", "UK", "AU", "IN"], calories: 102, servingSize: "1 tbsp" },
  { id: "us12", name: "Quinoa", category: "grain", fodmap: "safe", countries: ["US", "UK", "AU"], calories: 222, servingSize: "1 cup cooked" },
  { id: "us13", name: "Sweet Potato", category: "vegetable", fodmap: "safe", countries: ["US", "AU"], calories: 103, servingSize: "1 medium" },
  { id: "us14", name: "Kale", category: "vegetable", fodmap: "safe", countries: ["US", "UK", "AU"], calories: 33, servingSize: "1 cup" },
  { id: "us15", name: "Lettuce", category: "vegetable", fodmap: "safe", countries: ["US", "UK", "AU", "IN"], calories: 5, servingSize: "1 cup" },
];

export function getFoodsByCountry(countryCode: string): Food[] {
  return FOODS.filter(f => f.countries.includes(countryCode));
}

export function getSafeFoodsByCountry(countryCode: string): Food[] {
  return FOODS.filter(f => f.countries.includes(countryCode) && f.fodmap === "safe");
}
