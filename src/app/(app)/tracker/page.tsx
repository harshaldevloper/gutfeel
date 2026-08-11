"use client";

import { useState } from "react";

const SYMPTOM_TYPES = ["Bloating", "Cramping", "Gas", "Diarrhea", "Constipation", "Nausea", "Fatigue"];
const BOWEL_TYPES = ["normal", "constipation", "diarrhea", "mixed"];

export default function Tracker() {
  const [severity, setSeverity] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [bowel, setBowel] = useState("normal");
  const [stress, setStress] = useState(3);
  const [logged, setLogged] = useState(false);

  function toggleSymptom(s: string) {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleLog() {
    setLogged(true);
    setTimeout(() => setLogged(false), 3000);
  }

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
            <a href="/dashboard" className="text-stone-500 hover:text-stone-700">Plan</a>
            <a href="/tracker" className="text-emerald-600 font-medium">Tracker</a>
            <a href="/foods" className="text-stone-500 hover:text-stone-700">Foods</a>
            <a href="/reintroduction" className="text-stone-500 hover:text-stone-700">Reintroduction</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h1 className="text-xl font-bold text-stone-900 mb-2">How are you feeling?</h1>
          <p className="text-sm text-stone-500 mb-6">Quick log — takes 10 seconds</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Overall severity: <span className="font-bold text-emerald-600">{severity}/5</span></label>
              <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(+e.target.value)} className="w-full accent-emerald-500" />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>No symptoms</span>
                <span>Severe</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {SYMPTOM_TYPES.map(s => (
                  <button key={s} onClick={() => toggleSymptom(s)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedSymptoms.includes(s) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-stone-100 text-stone-600 border border-stone-200"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Bowel movement</label>
              <div className="grid grid-cols-4 gap-2">
                {BOWEL_TYPES.map(b => (
                  <button key={b} onClick={() => setBowel(b)} className={`p-2 rounded-lg border text-xs font-medium capitalize transition-colors ${bowel === b ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-200"}`}>{b}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">Stress level: <span className="font-bold text-emerald-600">{stress}/5</span></label>
              <input type="range" min="1" max="5" value={stress} onChange={e => setStress(+e.target.value)} className="w-full accent-emerald-500" />
            </div>

            <button onClick={handleLog} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
              {logged ? "✓ Logged!" : "Log Symptoms"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Recent Patterns</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <span className="text-lg">📉</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Symptoms decreasing</p>
                <p className="text-xs text-stone-500">40% better than your first week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <span className="text-lg">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Possible trigger: Broccoli</p>
                <p className="text-xs text-stone-500">Symptoms appeared 3/4 times after eating</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <span className="text-lg">✅</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Safe: Quinoa, Chicken, Spinach</p>
                <p className="text-xs text-stone-500">No symptoms in 5+ meals</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
