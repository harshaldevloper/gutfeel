"use client";

import { useEffect, useState } from "react";
import { FOODS, getFoodsByCountry } from "@/lib/localizedFoods";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";
import SearchInput from "@/components/ui/SearchInput";
import FodmapBadge from "@/components/ui/FodmapBadge";
import CountryBadge from "@/components/ui/CountryBadge";

const CATEGORIES = ["all", "grain", "protein", "vegetable", "fruit", "dairy", "fat", "sweetener", "spice"];
const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "safe", label: "Safe" },
  { key: "moderate", label: "Caution" },
  { key: "high", label: "Avoid" },
];

export default function Foods() {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    setCountry(localStorage.getItem("gutfeel.country") || "IN");
  }, []);

  const countryFoods = getFoodsByCountry(country);
  const filtered = countryFoods.filter(f => {
    if (filter !== "all" && f.fodmap !== filter) return false;
    if (category !== "all" && f.category !== category) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen app-page-bg pb-28">
      <AppHeader title="Food Database" right={<CountryBadge country={country} />} />

      <main className="max-w-4xl mx-auto px-4 py-5 space-y-5">
        <div>
          <h1 className="font-serif text-2xl font-bold text-brand-navy mb-1">Find food</h1>
          <p className="text-sm text-brand-green-dark/80 font-medium">Search {countryFoods.length} items rated for your region</p>
        </div>

        <SearchInput value={search} onChange={setSearch} placeholder="Search foods..." />

        <div>
          <p className="section-label mb-2">FODMAP level</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`chip ${filter === f.key ? "chip-active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="section-label mb-2">Category</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip capitalize text-xs py-1.5 ${category === c ? "chip-dark-active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-stone-500 font-medium">{filtered.length} foods · sorted A–Z</p>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="premium-card p-8 text-center">
              <p className="font-semibold text-brand-navy">No foods match</p>
              <p className="text-sm text-stone-500 mt-1">Try a different search or filter</p>
            </div>
          ) : (
            filtered.map(food => (
              <div
                key={food.id}
                className="meal-row-card p-4 flex items-center gap-4 active:scale-[0.99] transition-transform"
              >
                <div className="food-row-icon">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 truncate">{food.name}</p>
                  <p className="text-xs text-stone-500 capitalize mt-0.5">
                    {food.category}
                    {food.calories ? ` · ${food.calories} cal` : ""}
                  </p>
                </div>
                <FodmapBadge level={food.fodmap} />
              </div>
            ))
          )}
        </div>
      </main>
      <AppBottomNav />
    </div>
  );
}
