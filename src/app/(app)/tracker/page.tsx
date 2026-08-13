"use client";

import { useEffect, useState } from "react";
import { saveEntry, getDbStats, type DbStats } from "@/lib/storage";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";

const SYMPTOM_TYPES = ["Bloating", "Cramping", "Gas", "Diarrhea", "Constipation", "Nausea", "Fatigue"];
const BOWEL_TYPES = ["normal", "constipation", "diarrhea", "mixed"];
const COMMON_FOODS = [
  "White Rice", "Roti (Chapati)", "Dal (Moong)", "Paneer", "Chicken Breast", "Eggs",
  "Curd (Dahi)", "Potato", "Tomato", "Spinach", "Bell Pepper", "Cucumber",
  "Bottle Gourd (Lauki)", "Banana", "Papaya", "Onion", "Garlic", "Broccoli",
];

export default function Tracker() {
  const [severity, setSeverity] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [bowel, setBowel] = useState("normal");
  const [stress, setStress] = useState(3);
  const [logged, setLogged] = useState(false);
  const [stats, setStats] = useState<DbStats>({ entries: [], streak: 0, fingerprint: [], triggeredFoods: [], testedCount: 0 });

  useEffect(() => {
    getDbStats().then(setStats);
  }, []);

  const topTrigger = stats.fingerprint.find(f => f.status === "confirmed-trigger" || f.status === "likely-trigger");
  const safeFoods = stats.fingerprint.filter(f => (f.status === "safe" || f.status === "likely-safe") && f.testCount > 0).slice(0, 3);

  function toggle(list: string[], item: string, fn: (v: string[]) => void) {
    fn(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  }

  async function handleLog() {
    await saveEntry({ severity, symptoms: selectedSymptoms, bowel, stress, foods: selectedFoods });
    await getDbStats().then(setStats);
    setLogged(true);
    setTimeout(() => setLogged(false), 3000);
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      <AppHeader title="Symptom Tracker" />

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h1 className="text-xl font-bold text-stone-900 mb-2">How are you feeling?</h1>
          <p className="text-sm text-stone-500 mb-6">Quick log — takes 10 seconds</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Overall severity: <span className="font-bold text-brand-green-dark">{severity}/5</span></label>
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-brand-green h-2" />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>No symptoms</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_TYPES.map(s => (
                  <button key={s} onClick={() => toggle(selectedSymptoms, s, setSelectedSymptoms)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSymptoms.includes(s) ? "bg-brand-green-light text-brand-green-dark border border-brand-green/30" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Foods eaten today</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_FOODS.map(f => (
                  <button key={f} onClick={() => toggle(selectedFoods, f, setSelectedFoods)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedFoods.includes(f) ? "bg-brand-green-light text-brand-green-dark border border-brand-green/30" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Bowel movement</label>
              <div className="grid grid-cols-4 gap-2">
                {BOWEL_TYPES.map(b => (
                  <button key={b} onClick={() => setBowel(b)} className={`p-2 rounded-xl border text-xs font-medium capitalize transition-all ${bowel === b ? "border-brand-green bg-brand-green-light text-brand-green-dark" : "border-stone-200"}`}>{b}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Stress level: <span className="font-bold text-brand-green-dark">{stress}/5</span></label>
              <input type="range" min="1" max="5" value={stress} onChange={e => setStress(+e.target.value)} className="w-full accent-brand-green h-2" />
            </div>

            <button onClick={handleLog} className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl font-bold text-base active:scale-95 transition-transform">
              {logged ? "✓ Logged!" : "Log Symptoms"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Recent Patterns</h2>
          <div className="space-y-3">
            {topTrigger ? (
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <span className="text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">Possible trigger: {topTrigger.foodName}</p>
                  <p className="text-xs text-stone-500">{topTrigger.confidence}% confidence across {topTrigger.testCount} logs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                <span className="text-lg">📊</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">No triggers found yet</p>
                  <p className="text-xs text-stone-500">Log {Math.max(0, 3 - stats.entries.length)} more day{stats.entries.length === 2 ? "" : "s"} to reveal patterns</p>
                </div>
              </div>
            )}
            {safeFoods.length > 0 ? (
              <div className="flex items-center gap-3 p-3 bg-brand-green-light rounded-xl">
                <span className="text-lg">✅</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">Safe: {safeFoods.map(f => f.foodName).join(", ")}</p>
                  <p className="text-xs text-stone-500">No symptom reaction in your logs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-brand-green-light rounded-xl">
                <span className="text-lg">📉</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">Consistent logging</p>
                  <p className="text-xs text-stone-500">{stats.streak > 0 ? `${stats.streak}-day streak! Keep going.` : "Log daily to see trends over time."}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <AppBottomNav />
</div>
  );
}
