"use client";

import { useState } from "react";

const PHASES = [
  { name: "Fructans", status: "completed", weeks: "Weeks 1-2", result: "Safe ✓" },
  { name: "GOS", status: "completed", weeks: "Weeks 3-4", result: "Safe ✓" },
  { name: "Lactose", status: "active", weeks: "Weeks 5-6", result: "In progress..." },
  { name: "Fructose", status: "upcoming", weeks: "Weeks 7-8", result: "Pending" },
  { name: "Sorbitol", status: "upcoming", weeks: "Weeks 9-10", result: "Pending" },
  { name: "Mannitol", status: "upcoming", weeks: "Weeks 11-12", result: "Pending" },
];

export default function Reintroduction() {
  const [activePhase, setActivePhase] = useState(2);

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-lg font-bold text-stone-900">Gutfeel</span>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="/dashboard" className="text-stone-500 hover:text-stone-700">Plan</a>
            <a href="/tracker" className="text-stone-500 hover:text-stone-700">Tracker</a>
            <a href="/foods" className="text-stone-500 hover:text-stone-700">Foods</a>
            <a href="/reintroduction" className="text-emerald-600 font-medium">Reintroduction</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h1 className="text-xl font-bold text-stone-900 mb-2">Reintroduction Protocol</h1>
          <p className="text-sm text-stone-500 mb-6">Test FODMAP groups one at a time to find YOUR triggers</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "33%" }} />
            </div>
            <span className="text-sm font-medium text-stone-600">33%</span>
          </div>

          <div className="space-y-3">
            {PHASES.map((phase, i) => (
              <button key={i} onClick={() => setActivePhase(i)} className={`w-full text-left p-4 rounded-xl border transition-colors ${activePhase === i ? "border-emerald-300 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${phase.status === "completed" ? "bg-emerald-500 text-white" : phase.status === "active" ? "bg-amber-500 text-white" : "bg-stone-200 text-stone-500"}`}>
                      {phase.status === "completed" ? "✓" : i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{phase.name}</p>
                      <p className="text-xs text-stone-500">{phase.weeks}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${phase.status === "completed" ? "text-emerald-600" : phase.status === "active" ? "text-amber-600" : "text-stone-400"}`}>{phase.result}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {PHASES[activePhase].status === "active" && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <h2 className="text-lg font-semibold text-amber-900 mb-2">Current Challenge: {PHASES[activePhase].name}</h2>
            <p className="text-sm text-amber-700 mb-4">Follow these steps for the next 3 days:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mt-0.5">1</div>
                <div>
                  <p className="text-sm font-medium text-amber-900">Day 1: Small dose</p>
                  <p className="text-xs text-amber-700">Eat 1/4 serving of the challenge food. Log symptoms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mt-0.5">2</div>
                <div>
                  <p className="text-sm font-medium text-amber-900">Day 2: Medium dose</p>
                  <p className="text-xs text-amber-700">If no reaction, eat 1/2 serving. Log symptoms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold text-amber-800 mt-0.5">3</div>
                <div>
                  <p className="text-sm font-medium text-amber-900">Day 3: Full dose</p>
                  <p className="text-xs text-amber-700">If still no reaction, eat full serving. Log symptoms.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800"><strong>Challenge foods for Lactose:</strong> 1/4 cup regular milk, 1/2 cup yogurt, 1 slice soft cheese</p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-xs font-medium">Home</span>
          </a>
          <a href="/plan" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-xs font-medium">Plan</span>
          </a>
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium">Tracker</span>
          </a>
          <a href="/foods" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-xs font-medium">Foods</span>
          </a>
          <a href="/food-safety" className="flex flex-col items-center gap-0.5 py-1 px-3 text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-xs font-medium">Safety</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
