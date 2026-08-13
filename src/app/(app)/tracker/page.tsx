"use client";

import { useEffect, useMemo, useState } from "react";
import { saveEntry, getDbStats, type DbStats } from "@/lib/storage";
import AppHeader from "@/components/AppHeader";
import AppBottomNav from "@/components/AppBottomNav";
import SearchInput from "@/components/ui/SearchInput";

const SYMPTOM_TYPES = ["Bloating", "Cramping", "Gas", "Diarrhea", "Constipation", "Nausea", "Fatigue"];
const BOWEL_TYPES = [
  { id: "normal", label: "Normal" },
  { id: "constipation", label: "Constipated" },
  { id: "diarrhea", label: "Loose" },
  { id: "mixed", label: "Mixed" },
];
const COMMON_FOODS = [
  "White Rice", "Roti (Chapati)", "Dal (Moong)", "Paneer", "Chicken Breast", "Eggs",
  "Curd (Dahi)", "Potato", "Tomato", "Spinach", "Bell Pepper", "Cucumber",
  "Bottle Gourd (Lauki)", "Banana", "Papaya", "Onion", "Garlic", "Broccoli",
];

function PatternIcon({ type }: { type: "warn" | "chart" | "check" | "trend" }) {
  const cls = "w-5 h-5 shrink-0";
  if (type === "warn") {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (type === "trend") {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    );
  }
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

export default function Tracker() {
  const [severity, setSeverity] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [bowel, setBowel] = useState("normal");
  const [stress, setStress] = useState(3);
  const [foodSearch, setFoodSearch] = useState("");
  const [logged, setLogged] = useState(false);
  const [stats, setStats] = useState<DbStats>({ entries: [], streak: 0, fingerprint: [], triggeredFoods: [], testedCount: 0 });

  useEffect(() => {
    getDbStats().then(setStats);
  }, []);

  const filteredFoods = useMemo(() => {
    if (!foodSearch.trim()) return COMMON_FOODS;
    const q = foodSearch.toLowerCase();
    return COMMON_FOODS.filter(f => f.toLowerCase().includes(q));
  }, [foodSearch]);

  const topTrigger = stats.fingerprint.find(f => f.status === "confirmed-trigger" || f.status === "likely-trigger");
  const safeFoods = stats.fingerprint.filter(f => (f.status === "safe" || f.status === "likely-safe") && f.testCount > 0).slice(0, 3);
  const remaining = Math.max(0, 3 - stats.entries.length);

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
    <div className="min-h-screen app-page-bg pb-24">
      <AppHeader title="Symptom Tracker" />

      <main className="max-w-4xl mx-auto px-4 py-5 space-y-4">
        <div>
          <p className="section-label text-brand-green-dark">Daily log</p>
          <h1 className="font-serif text-2xl font-bold text-brand-navy mt-1">How are you feeling?</h1>
          <p className="text-sm text-stone-500 mt-1">Build your fingerprint — under a minute</p>
        </div>

        <div className="premium-card p-5 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Overall severity: <span className="text-brand-green-dark">{severity}/5</span>
            </label>
            <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-brand-green h-2" />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>Mild</span>
              <span>Severe</span>
            </div>
          </div>

          <div>
            <label className="block section-label mb-2">Symptoms</label>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_TYPES.map(s => (
                <button
                  key={s}
                  onClick={() => toggle(selectedSymptoms, s, setSelectedSymptoms)}
                  className={`chip ${selectedSymptoms.includes(s) ? "chip-active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block section-label mb-2">Foods eaten</label>
            <SearchInput value={foodSearch} onChange={setFoodSearch} placeholder="Search foods..." className="mb-3" />
            <div className="flex flex-wrap gap-2">
              {filteredFoods.map(f => (
                <button
                  key={f}
                  onClick={() => toggle(selectedFoods, f, setSelectedFoods)}
                  className={`chip text-xs py-1.5 ${selectedFoods.includes(f) ? "chip-active" : ""}`}
                >
                  {f}
                </button>
              ))}
            </div>
            {selectedFoods.length > 0 && (
              <p className="text-xs text-brand-green-dark font-semibold mt-2">{selectedFoods.length} selected</p>
            )}
          </div>

          <div>
            <label className="block section-label mb-2">Bowel movement</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BOWEL_TYPES.map(b => (
                <button
                  key={b.id}
                  onClick={() => setBowel(b.id)}
                  className={`py-2.5 px-2 rounded-xl border text-sm font-semibold transition-all ${bowel === b.id ? "border-brand-green bg-brand-green-light text-brand-green-dark" : "border-stone-200 text-stone-600 bg-white"}`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Stress level: <span className="text-brand-green-dark">{stress}/5</span>
            </label>
            <input type="range" min="1" max="5" value={stress} onChange={e => setStress(+e.target.value)} className="w-full accent-brand-green h-2" />
          </div>

          <button
            onClick={handleLog}
            className={`w-full py-3.5 rounded-xl font-bold text-base active:scale-[0.98] transition-all ${logged ? "bg-brand-green text-white" : "bg-brand-navy hover:bg-brand-navy-light text-white"}`}
          >
            {logged ? "Logged successfully" : "Save today's log"}
          </button>
        </div>

        <div className="premium-card p-5">
          <h2 className="font-serif font-bold text-brand-navy mb-4">Recent patterns</h2>
          <div className="space-y-3">
            {topTrigger ? (
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
                <PatternIcon type="warn" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Possible trigger: {topTrigger.foodName}</p>
                  <p className="text-xs opacity-80 mt-0.5">{topTrigger.confidence}% confidence across {topTrigger.testCount} logs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
                <PatternIcon type="chart" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">No triggers found yet</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {remaining > 0
                      ? `Log ${remaining} more ${remaining === 1 ? "day" : "days"} to reveal patterns`
                      : "Keep logging to sharpen accuracy"}
                  </p>
                </div>
              </div>
            )}
            {safeFoods.length > 0 ? (
              <div className="flex items-start gap-3 p-3 bg-brand-green-light rounded-xl border border-brand-green/20 text-brand-green-dark">
                <PatternIcon type="check" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Safe: {safeFoods.map(f => f.foodName).join(", ")}</p>
                  <p className="text-xs opacity-80 mt-0.5">No symptom reaction in your logs</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-brand-green-light rounded-xl border border-brand-green/20 text-brand-green-dark">
                <PatternIcon type="trend" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Consistent logging</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {stats.streak > 0 ? `${stats.streak}-day streak — keep going` : "Log daily to see trends over time"}
                  </p>
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
