"use client";

import { useState } from "react";
import { saveEntry } from "@/lib/storage";

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

  function toggle(list: string[], item: string, fn: (v: string[]) => void) {
    fn(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  }

  async function handleLog() {
    await saveEntry({ severity, symptoms: selectedSymptoms, bowel, stress, foods: selectedFoods });
    setLogged(true);
    setTimeout(() => setLogged(false), 3000);
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <header className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" width="28" height="28" alt="Gutfeel" />
            <span className="text-lg font-bold text-stone-900">Symptom Tracker</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h1 className="text-xl font-bold text-stone-900 mb-2">How are you feeling?</h1>
          <p className="text-sm text-stone-500 mb-6">Quick log — takes 10 seconds</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Overall severity: <span className="font-bold text-emerald-600">{severity}/5</span></label>
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-emerald-500 h-2" />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>No symptoms</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_TYPES.map(s => (
                  <button key={s} onClick={() => toggle(selectedSymptoms, s, setSelectedSymptoms)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedSymptoms.includes(s) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Foods eaten today</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_FOODS.map(f => (
                  <button key={f} onClick={() => toggle(selectedFoods, f, setSelectedFoods)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedFoods.includes(f) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Bowel movement</label>
              <div className="grid grid-cols-4 gap-2">
                {BOWEL_TYPES.map(b => (
                  <button key={b} onClick={() => setBowel(b)} className={`p-2 rounded-xl border text-xs font-medium capitalize transition-all ${bowel === b ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200"}`}>{b}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Stress level: <span className="font-bold text-emerald-600">{stress}/5</span></label>
              <input type="range" min="1" max="5" value={stress} onChange={e => setStress(+e.target.value)} className="w-full accent-emerald-500 h-2" />
            </div>

            <button onClick={handleLog} className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-base active:scale-95 transition-transform">
              {logged ? "✓ Logged!" : "Log Symptoms"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Recent Patterns</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
              <span className="text-lg">📉</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Symptoms decreasing</p>
                <p className="text-xs text-stone-500">40% better than your first week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <span className="text-lg">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Possible trigger: Broccoli</p>
                <p className="text-xs text-stone-500">Symptoms appeared 3/4 times after eating</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
              <span className="text-lg">✅</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Safe: Quinoa, Chicken, Spinach</p>
                <p className="text-xs text-stone-500">No symptoms in 5+ meals</p>
              </div>
            </div>
          </div>
        </div>
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
          <a href="/tracker" className="flex flex-col items-center gap-0.5 py-1 px-3 text-emerald-600">
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
