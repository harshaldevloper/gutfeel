"use client";

import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY_MEALS = [
  { meal: "Breakfast", name: "Scrambled eggs with spinach", time: "12 min", confidence: 95, emoji: "🍳", logged: true },
  { meal: "Lunch", name: "Quinoa bowl with grilled chicken", time: "20 min", confidence: 92, emoji: "🥙", logged: false },
  { meal: "Dinner", name: "Lemon herb salmon with rice", time: "25 min", confidence: 90, emoji: "🍲", logged: false },
];

const FINGERPRINT_DATA = {
  completed: 4,
  total: 14,
  triggers: [
    { food: "Broccoli", confidence: 87, status: "likely-trigger" },
    { food: "Onion", confidence: 92, status: "confirmed-trigger" },
    { food: "Quinoa", confidence: 12, status: "likely-safe" },
    { food: "Chicken", confidence: 5, status: "confirmed-safe" },
  ],
};

const STREAK = 5;

const SYMPTOM_TODAY = { severity: null, logged: false };

export default function Dashboard() {
  const [symptomLogged, setSymptomLogged] = useState(false);
  const [severity, setSeverity] = useState(3);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" width="28" height="28" alt="gutfeel" />
            <span className="text-lg font-bold text-stone-900">gutfeel</span>
          </div>
          <nav className="flex gap-3 text-sm">
            <a href="/dashboard" className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">Today</a>
            <a href="/tracker" className="px-3 py-1.5 text-stone-500 hover:text-stone-700">Tracker</a>
            <a href="/foods" className="px-3 py-1.5 text-stone-500 hover:text-stone-700">Foods</a>
            <a href="/reintroduction" className="px-3 py-1.5 text-stone-500 hover:text-stone-700">Protocol</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Daily Check-in */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-emerald-100 text-sm">Good morning!</p>
              <h1 className="text-xl font-bold">How is your gut today?</h1>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">{STREAK}</div>
              <p className="text-emerald-100 text-xs mt-1">day streak</p>
            </div>
          </div>
          {!symptomLogged ? (
            <div className="space-y-3">
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-white" />
              <div className="flex justify-between text-xs text-emerald-100">
                <span>Feeling great</span>
                <span>Severe symptoms</span>
              </div>
              <button onClick={() => setSymptomLogged(true)} className="w-full py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                Log Today&apos;s Symptoms
              </button>
            </div>
          ) : (
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <p className="text-lg font-semibold">✓ Logged today!</p>
              <p className="text-emerald-100 text-sm">Severity: {severity}/5. Keep your streak going!</p>
            </div>
          )}
        </div>

        {/* Fingerprint Progress */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-900">Your FODMAP Fingerprint</h2>
            <span className="text-xs text-stone-500">{FINGERPRINT_DATA.completed}/{FINGERPRINT_DATA.total} foods tested</span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all" style={{ width: `${(FINGERPRINT_DATA.completed / FINGERPRINT_DATA.total) * 100}%` }} />
          </div>
          <p className="text-sm text-stone-600 mb-4">Log daily to discover YOUR specific triggers. Most users see patterns after 7 days.</p>
          <div className="grid grid-cols-2 gap-2">
            {FINGERPRINT_DATA.triggers.map((t, i) => (
              <div key={i} className={`p-3 rounded-lg border ${t.status === "confirmed-trigger" ? "border-red-200 bg-red-50" : t.status === "likely-trigger" ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
                <p className="text-sm font-medium text-stone-900">{t.food}</p>
                <p className={`text-xs font-semibold ${t.status === "confirmed-trigger" ? "text-red-600" : t.status === "likely-trigger" ? "text-amber-600" : "text-emerald-600"}`}>
                  {t.status === "confirmed-trigger" ? "✗ Trigger" : t.status === "likely-trigger" ? "⚠ Likely trigger" : "✓ Safe"} · {t.confidence}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Today\'s Meals */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-900">Today&apos;s Meals</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">92% safe</span>
          </div>
          <div className="space-y-3">
            {TODAY_MEALS.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-lg">{m.emoji}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">{m.name}</p>
                  <p className="text-xs text-stone-500">{m.meal} · {m.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">{m.confidence}%</p>
                  <p className="text-xs text-stone-400">safe</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Symptom Chart */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <h2 className="font-bold text-stone-900 mb-4">This Week&apos;s Symptoms</h2>
          <div className="flex items-end gap-2 h-24">
            {[2, 1, 3, 1, 2, 1, 1].map((level, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{ height: "80px" }}>
                  <div className={`absolute bottom-0 w-full rounded-t-md transition-all ${i === 6 ? "bg-emerald-500" : level <= 1 ? "bg-emerald-300" : level <= 2 ? "bg-amber-300" : "bg-red-300"}`} style={{ height: `${level * 33}%`, opacity: i === 6 ? 1 : 0.6 }} />
                </div>
                <span className={`text-xs ${i === 6 ? "font-bold text-emerald-600" : "text-stone-400"}`}>{DAYS[i]}{i === 6 ? " (today)" : ""}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-600 mt-3 font-medium">↘ 40% better than last week</p>
        </div>
      </main>
    </div>
  );
}
