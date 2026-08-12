"use client";

import { useEffect, useState } from "react";
import { getDbStats } from "@/lib/storage";
import { FOODS } from "@/lib/localizedFoods";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";

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
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    getDbStats().then(s => {
      setProgress(Math.min(100, Math.round((s.testedCount / FOODS.length) * 100)));
    });
  }, []);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <AppHeader title="Reintroduction" />

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h1 className="text-xl font-bold text-stone-900 mb-2">Reintroduction Protocol</h1>
          <p className="text-sm text-stone-500 mb-6">Test FODMAP groups one at a time to find YOUR triggers</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-medium text-stone-600">{progress}%</span>
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
      <AppBottomNav />
</div>
  );
}
