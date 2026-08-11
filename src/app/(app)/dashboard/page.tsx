"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SAMPLE_PLAN = {
  monday: {
    breakfast: { name: "Scrambled eggs with spinach", time: "12 min", confidence: 95, emoji: "🍳" },
    lunch: { name: "Quinoa bowl with grilled chicken", time: "20 min", confidence: 92, emoji: "🥙" },
    dinner: { name: "Lemon herb salmon with rice", time: "25 min", confidence: 90, emoji: "🍲" },
  },
  tuesday: {
    breakfast: { name: "Oatmeal with blueberries", time: "8 min", confidence: 97, emoji: "🥣" },
    lunch: { name: "Turkey lettuce wraps", time: "15 min", confidence: 93, emoji: "🌯" },
    dinner: { name: "Stir-fried tofu with vegetables", time: "22 min", confidence: 88, emoji: "🥘" },
  },
  wednesday: {
    breakfast: { name: "Rice cakes with peanut butter", time: "5 min", confidence: 96, emoji: "🥜" },
    lunch: { name: "Grilled chicken salad", time: "18 min", confidence: 91, emoji: "🥗" },
    dinner: { name: "Baked cod with roasted carrots", time: "30 min", confidence: 89, emoji: "🐟" },
  },
};

const SYMPTOM_DATA = [
  { day: "Mon", level: 2 },
  { day: "Tue", level: 1 },
  { day: "Wed", level: 3 },
  { day: "Thu", level: 1 },
  { day: "Fri", level: 2 },
  { day: "Sat", level: 1 },
  { day: "Sun", level: 1 },
];

export default function Dashboard() {
  const [activeDay, setActiveDay] = useState("monday");
  const today = SAMPLE_PLAN[activeDay as keyof typeof SAMPLE_PLAN];

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
            <a href="/dashboard" className="text-emerald-600 font-medium">Plan</a>
            <a href="/tracker" className="text-stone-500 hover:text-stone-700">Tracker</a>
            <a href="/foods" className="text-stone-500 hover:text-stone-700">Foods</a>
            <a href="/reintroduction" className="text-stone-500 hover:text-stone-700">Reintroduction</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-stone-900">Your Week</h1>
              <p className="text-sm text-stone-500">Elimination Phase • Week 1</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">92%</p>
              <p className="text-xs text-stone-500">Symptom confidence</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DAYS.map(day => (
              <button key={day} onClick={() => setActiveDay(day.toLowerCase())} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeDay === day.toLowerCase() ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {today && Object.entries(today).map(([meal, data]) => (
            <div key={meal} className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">{data.emoji}</div>
              <div className="flex-1">
                <p className="text-xs text-stone-500 capitalize mb-0.5">{meal}</p>
                <p className="font-medium text-stone-900">{data.name}</p>
                <p className="text-xs text-stone-500">{data.time}</p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${data.confidence >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{data.confidence}%</div>
                <p className="text-xs text-stone-400">safe</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">This Week's Symptoms</h2>
          <div className="flex items-end gap-2 h-24">
            {SYMPTOM_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-stone-100 rounded-t-md relative" style={{ height: "80px" }}>
                  <div className={`absolute bottom-0 w-full rounded-t-md ${d.level <= 1 ? "bg-emerald-400" : d.level <= 2 ? "bg-amber-400" : "bg-red-400"}`} style={{ height: `${d.level * 33}%` }} />
                </div>
                <span className="text-xs text-stone-500">{d.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-3">Trending down — 40% better than last week</p>
        </div>

        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-2">Grocery List</h2>
          <p className="text-sm text-emerald-700 mb-4">Auto-generated for this week's meals</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Eggs", "Spinach", "Quinoa", "Chicken breast", "Salmon", "Rice", "Tofu", "Blueberries"].map(item => (
              <div key={item} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
                <div className="w-4 h-4 border-2 border-emerald-400 rounded" />
                <span className="text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
