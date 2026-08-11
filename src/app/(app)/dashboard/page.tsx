"use client";

import { useState } from "react";

const TODAY_MEALS = [
  { meal: "Breakfast", name: "Scrambled eggs with spinach", time: "12 min", confidence: 95, emoji: "🍳", logged: true },
  { meal: "Lunch", name: "Quinoa bowl with grilled chicken", time: "20 min", confidence: 92, emoji: "🥙", logged: false },
  { meal: "Dinner", name: "Lemon herb salmon with rice", time: "25 min", confidence: 90, emoji: "🍲", logged: false },
];

const FINGERPRINT = [
  { food: "Broccoli", confidence: 87, status: "likely-trigger" },
  { food: "Onion", confidence: 92, status: "confirmed-trigger" },
  { food: "Quinoa", confidence: 12, status: "likely-safe" },
  { food: "Chicken", confidence: 5, status: "confirmed-safe" },
];

const STREAK = 5;

export default function Dashboard() {
  const [symptomLogged, setSymptomLogged] = useState(false);
  const [severity, setSeverity] = useState(3);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" width="28" height="28" alt="Gutfeel" />
            <span className="text-lg font-bold text-stone-900">Gutfeel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="text-sm font-bold text-amber-700">{STREAK}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Daily Check-in */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200">
          <p className="text-emerald-100 text-sm">Good morning!</p>
          <h1 className="text-xl font-bold mb-4">How is your gut today?</h1>
          {!symptomLogged ? (
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-emerald-100 px-1">
                <span>😊 Great</span>
                <span>😣 Severe</span>
              </div>
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-white h-2" />
              <button onClick={() => setSymptomLogged(true)} className="w-full py-3.5 bg-white text-emerald-700 rounded-xl font-bold text-base active:scale-95 transition-transform">
                Log Today&apos;s Symptoms
              </button>
            </div>
          ) : (
            <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-lg font-semibold">✓ Logged today!</p>
              <p className="text-emerald-100 text-sm">Severity: {severity}/5. Keep your streak!</p>
            </div>
          )}
        </div>

        {/* Fingerprint Progress */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-stone-900">FODMAP Fingerprint</h2>
            <span className="text-xs text-stone-500">4/14 foods</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full mb-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: "29%" }} />
          </div>
          <p className="text-sm text-stone-600 mb-4">Log daily to discover YOUR triggers. Patterns appear after 7 days.</p>
          <div className="grid grid-cols-2 gap-2">
            {FINGERPRINT.map((t, i) => (
              <div key={i} className={`p-3 rounded-xl border ${t.status === "confirmed-trigger" ? "border-red-200 bg-red-50" : t.status === "likely-trigger" ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
                <p className="text-sm font-medium text-stone-900">{t.food}</p>
                <p className={`text-xs font-semibold mt-0.5 ${t.status === "confirmed-trigger" ? "text-red-600" : t.status === "likely-trigger" ? "text-amber-600" : "text-emerald-600"}`}>
                  {t.status === "confirmed-trigger" ? "✗ Trigger" : t.status === "likely-trigger" ? "⚠ Likely" : "✓ Safe"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Today\'s Meals */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-900">Today&apos;s Meals</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">92% safe</span>
          </div>
          <div className="space-y-3">
            {TODAY_MEALS.map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100 active:bg-stone-100 transition-colors">
                <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">{m.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{m.name}</p>
                  <p className="text-xs text-stone-500">{m.meal} · {m.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-emerald-600">{m.confidence}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h2 className="font-bold text-stone-900 mb-4">This Week</h2>
          <div className="flex items-end gap-2 h-20">
            {[2, 1, 3, 1, 2, 1, 1].map((level, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative" style={{ height: "60px" }}>
                  <div className={`absolute bottom-0 w-full rounded-t-lg ${i === 6 ? "bg-emerald-500" : level <= 1 ? "bg-emerald-200" : level <= 2 ? "bg-amber-200" : "bg-red-200"}`} style={{ height: `${level * 33}%`, opacity: i === 6 ? 1 : 0.5 }} />
                </div>
                <span className={`text-xs ${i === 6 ? "font-bold text-emerald-600" : "text-stone-400"}`}>{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium">Tracker</span>
          </a>
          <a href="/foods" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
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
