"use client";

import { useEffect, useState } from "react";
import { FOODS, getFoodsByCountry } from "@/lib/localizedFoods";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";

const CATEGORIES = ["all", "grain", "protein", "vegetable", "fruit", "dairy", "fat", "sweetener", "spice"];
const FILTERS = ["all", "safe", "moderate", "high"];

const COUNTRY_NAMES: Record<string, { label: string; flag: string }> = {
  IN: { label: "India", flag: "🇮🇳" },
  UK: { label: "United Kingdom", flag: "🇬🇧" },
  US: { label: "United States", flag: "🇺🇸" },
  AU: { label: "Australia", flag: "🇦🇺" },
};

export default function Foods() {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    setCountry(localStorage.getItem("gutfeel.country") || "IN");
  }, []);

  const countryInfo = COUNTRY_NAMES[country] ?? COUNTRY_NAMES.IN;
  const countryFoods = getFoodsByCountry(country);
  const filtered = countryFoods.filter(f => {
    if (filter !== "all" && f.fodmap !== filter) return false;
    if (category !== "all" && f.category !== category) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-cream pb-24">
      <AppHeader
        title="Food Database"
        right={<span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{countryInfo.flag} {countryInfo.label}</span>}
      />

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <input type="text" placeholder="Search foods..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-3 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === f ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-white text-stone-600 border border-stone-200"}`}>{f}</button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize transition-all ${category === c ? "bg-stone-800 text-white" : "bg-white text-stone-600 border border-stone-200"}`}>{c}</button>
          ))}
        </div>

        <p className="text-xs text-stone-500">{filtered.length} foods available</p>

        <div className="space-y-2">
          {filtered.map(food => (
            <div key={food.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between active:bg-stone-50 transition-colors">
              <div>
                <p className="font-medium text-stone-900">{food.name}</p>
                <p className="text-xs text-stone-500 capitalize">{food.category} {food.calories ? `· ${food.calories} cal` : ""}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${food.fodmap === "safe" ? "bg-emerald-100 text-emerald-700" : food.fodmap === "moderate" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{food.fodmap}</span>
            </div>
          ))}
        </div>
      </main>
      <AppBottomNav />
</div>
  );
}
