"use client";

import { useState } from "react";
import { FOODS, getFoodsByCountry } from "@/lib/localizedFoods";

const CATEGORIES = ["all", "grain", "protein", "vegetable", "fruit", "dairy", "fat", "sweetener", "spice"];
const FILTERS = ["all", "safe", "moderate", "high"];

export default function Foods() {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [country] = useState("IN"); // Would come from user profile

  const countryFoods = getFoodsByCountry(country);
  const filtered = countryFoods.filter(f => {
    if (filter !== "all" && f.fodmap !== filter) return false;
    if (category !== "all" && f.category !== category) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" width="28" height="28" alt="Gutfeel" />
            <span className="text-lg font-bold text-stone-900">Food Database</span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">🇮🇳 India</span>
        </div>
      </header>

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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium">Tracker</span>
          </a>
          <a href="/foods" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-xs font-medium">Foods</span>
          </a>
          <a href="/reintroduction" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            <span className="text-xs font-medium">Protocol</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
