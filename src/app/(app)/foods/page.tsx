"use client";

import { useState } from "react";

const FOODS = [
    { id: "f1", name: "Banana (ripe)", category: "fruit", fodmap: "safe", calories: 105 },
    { id: "f2", name: "Blueberries", category: "fruit", fodmap: "safe", calories: 85 },
    { id: "f3", name: "Strawberries", category: "fruit", fodmap: "safe", calories: 50 },
    { id: "f4", name: "Orange", category: "fruit", fodmap: "safe", calories: 62 },
    { id: "f5", name: "Grapes", category: "fruit", fodmap: "safe", calories: 100 },
    { id: "f6", name: "Watermelon", category: "fruit", fodmap: "high", calories: 46 },
    { id: "f7", name: "Apple", category: "fruit", fodmap: "high", calories: 95 },
    { id: "f8", name: "Mango", category: "fruit", fodmap: "high", calories: 200 },
    { id: "f9", name: "Chicken breast", category: "protein", fodmap: "safe", calories: 165 },
    { id: "f10", name: "Salmon", category: "protein", fodmap: "safe", calories: 208 },
    { id: "f11", name: "Eggs", category: "protein", fodmap: "safe", calories: 78 },
    { id: "f12", name: "Tofu (firm)", category: "protein", fodmap: "safe", calories: 144 },
    { id: "f13", name: "Beef", category: "protein", fodmap: "safe", calories: 250 },
    { id: "f14", name: "Lentils", category: "protein", fodmap: "high", calories: 230 },
    { id: "f15", name: "Chickpeas", category: "protein", fodmap: "high", calories: 269 },
    { id: "f16", name: "Quinoa", category: "grain", fodmap: "safe", calories: 222 },
    { id: "f17", name: "Rice (white)", category: "grain", fodmap: "safe", calories: 206 },
    { id: "f18", name: "Oats", category: "grain", fodmap: "safe", calories: 154 },
    { id: "f19", name: "Brown rice", category: "grain", fodmap: "safe", calories: 216 },
    { id: "f20", name: "Pasta (regular)", category: "grain", fodmap: "high", calories: 220 },
    { id: "f21", name: "Wheat bread", category: "grain", fodmap: "high", calories: 80 },
    { id: "f22", name: "Spinach", category: "vegetable", fodmap: "safe", calories: 7 },
    { id: "f23", name: "Carrots", category: "vegetable", fodmap: "safe", calories: 52 },
    { id: "f24", name: "Bell pepper", category: "vegetable", fodmap: "safe", calories: 31 },
    { id: "f25", name: "Cucumber", category: "vegetable", fodmap: "safe", calories: 16 },
    { id: "f26", name: "Tomato", category: "vegetable", fodmap: "safe", calories: 22 },
    { id: "f27", name: "Zucchini", category: "vegetable", fodmap: "safe", calories: 19 },
    { id: "f28", name: "Broccoli", category: "vegetable", fodmap: "moderate", calories: 55 },
    { id: "f29", name: "Onion", category: "vegetable", fodmap: "high", calories: 44 },
    { id: "f30", name: "Garlic", category: "vegetable", fodmap: "high", calories: 4 },
    { id: "f31", name: "Milk (cow)", category: "dairy", fodmap: "high", calories: 149 },
    { id: "f32", name: "Lactose-free milk", category: "dairy", fodmap: "safe", calories: 130 },
    { id: "f33", name: "Hard cheese", category: "dairy", fodmap: "safe", calories: 113 },
    { id: "f34", name: "Almond milk", category: "dairy", fodmap: "safe", calories: 39 },
    { id: "f35", name: "Olive oil", category: "fat", fodmap: "safe", calories: 119 },
    { id: "f36", name: "Butter", category: "fat", fodmap: "safe", calories: 102 },
    { id: "f37", name: "Maple syrup", category: "sweetener", fodmap: "safe", calories: 52 },
    { id: "f38", name: "Honey", category: "sweetener", fodmap: "high", calories: 64 },
];

const CATEGORIES = ["all", "fruit", "protein", "grain", "vegetable", "dairy", "fat", "sweetener"];
const FILTERS = ["all", "safe", "moderate", "high"];

export default function Foods() {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = FOODS.filter(f => {
    if (filter !== "all" && f.fodmap !== filter) return false;
    if (category !== "all" && f.category !== category) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-lg font-bold text-stone-900">GutWise</span>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="/dashboard" className="text-stone-500 hover:text-stone-700">Plan</a>
            <a href="/tracker" className="text-stone-500 hover:text-stone-700">Tracker</a>
            <a href="/foods" className="text-emerald-600 font-medium">Foods</a>
            <a href="/reintroduction" className="text-stone-500 hover:text-stone-700">Reintroduction</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4">
          <input type="text" placeholder="Search foods..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${filter === f ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-white text-stone-600 border border-stone-200"}`}>{f}</button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize transition-colors ${category === c ? "bg-stone-800 text-white" : "bg-white text-stone-600 border border-stone-200"}`}>{c}</button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map(food => (
            <div key={food.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-stone-900">{food.name}</p>
                <p className="text-xs text-stone-500 capitalize">{food.category} • {food.calories} cal</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${food.fodmap === "safe" ? "bg-emerald-100 text-emerald-700" : food.fodmap === "moderate" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{food.fodmap}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
