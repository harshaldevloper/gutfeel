"use client";

import { useEffect, useState } from "react";
import HintCard from "@/components/HintCard";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import {
  IBS_TYPES,
  suggestIbsTypeFromQuiz,
  type SymptomQuizAnswer,
} from "@/lib/ibsProfile";
import { loadProfile, saveProfile } from "@/lib/storage";

const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", foods: ["Rice", "Roti", "Dal", "Paneer", "Buttermilk"] },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", foods: ["Bread", "Potatoes", "Beans", "Cheese", "Apples"] },
  { code: "US", name: "United States", flag: "🇺🇸", foods: ["Chicken", "Rice", "Corn", "Beef", "Bananas"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", foods: ["Bread", "Meat", "Rice", "Bananas", "Cheese"] },
];

const ALLERGIES = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Shellfish"];
const DIETS = ["Vegetarian", "Vegan", "Pescatarian", "Halal", "Kosher"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [country, setCountry] = useState("");
  const [ibsType, setIbsType] = useState("");
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState<SymptomQuizAnswer>({ bowelPattern: "unsure", mainComplaint: "unsure" });
  const [allergies, setAllergies] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const [household, setHousehold] = useState(1);

  useEffect(() => {
    loadProfile().then(profile => {
      if (!profile) return;
      setCountry(profile.country);
      setIbsType(profile.ibsType);
      setAllergies(profile.allergies);
      setDiets(profile.diets);
      setSkill(profile.skill);
      setHousehold(profile.household);
    });
  }, []);

  function persistProfile(
    overrides: Partial<{
      country: string;
      ibsType: string;
      allergies: string[];
      diets: string[];
      skill: string;
      household: number;
    }> = {}
  ) {
    saveProfile({
      country: overrides.country ?? country,
      ibsType: overrides.ibsType ?? ibsType,
      allergies: overrides.allergies ?? allergies,
      diets: overrides.diets ?? diets,
      skill: overrides.skill ?? skill,
      household: overrides.household ?? household,
    });
  }

  function next() {
    setStep(Math.min(step + 1, 5));
  }
  function back() {
    setStep(Math.max(step - 1, 0));
  }
  function toggle(arr: string[], item: string, fn: (v: string[]) => void) {
    fn(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  }

  function applyQuizSuggestion() {
    const suggested = suggestIbsTypeFromQuiz(quiz);
    setIbsType(suggested);
    setExpandedType(suggested);
    setShowQuiz(false);
  }

  const selectedIbs = IBS_TYPES.find(t => t.id === ibsType);

  return (
    <OnboardingShell step={step} onBack={back} showBack={step > 0 && step < 5}>
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">3-minute setup</p>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">Welcome to GutVista</h1>
            <p className="text-stone-600 mt-2 leading-relaxed">
              We&apos;ll personalize meals and tracking for your region and gut — no medical jargon required.
            </p>
          </div>
          <HintCard title="What you'll set up" variant="tip">
            <ul>
              <li>Where you live (food database)</li>
              <li>Your IBS profile — we explain what that means</li>
              <li>Allergies, diet, and cooking preferences</li>
            </ul>
          </HintCard>
          <button type="button" onClick={next} className="btn-primary w-full">
            Get started
          </button>
          <p className="text-xs text-center text-stone-400">Not medical advice. You can change this anytime.</p>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-900">Where do you live?</h1>
            <p className="text-stone-600 mt-1 text-sm">We show foods you actually eat — roti and dal, not just kale salads.</p>
          </div>
          <div className="space-y-2">
            {COUNTRIES.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCountry(c.code);
                  persistProfile({ country: c.code });
                  next();
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${country === c.code ? "border-brand-green bg-brand-green-light ring-1 ring-brand-green/30" : "border-stone-200 hover:border-stone-300 bg-white"}`}
              >
                <span className="w-10 h-10 rounded-xl bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0">{c.code}</span>
                <div>
                  <p className="font-medium text-stone-900">{c.name}</p>
                  <p className="text-xs text-stone-500">{c.foods.join(" · ")}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-900">Your IBS profile</h1>
            <p className="text-stone-600 mt-1 text-sm leading-relaxed">
              <strong className="text-stone-800">IBS</strong> = Irritable Bowel Syndrome. Your &quot;profile&quot; is just the pattern of symptoms you usually have.
            </p>
          </div>

          <HintCard title="What is an IBS profile?" variant="info">
            <p>
              Doctors label IBS as <strong>IBS-D</strong>, <strong>IBS-C</strong>, <strong>IBS-M</strong>, or <strong>IBS-U</strong> based on whether diarrhea, constipation, or both dominate.
            </p>
            <p className="mt-2">GutVista uses this to tune meal suggestions — it&apos;s not a diagnosis.</p>
          </HintCard>

          <HintCard title="How do I find mine?" variant="tip">
            <ul>
              <li>
                <strong>From your doctor:</strong> Check discharge papers, prescriptions, or app notes for &quot;IBS-D&quot; etc.
              </li>
              <li>
                <strong>From symptoms:</strong> Pick the type below that sounds most like you.
              </li>
              <li>
                <strong>Not sure?</strong> Tap &quot;Help me figure it out&quot; or choose &quot;Not sure yet&quot;.
              </li>
            </ul>
          </HintCard>

          <div className="space-y-2">
            {IBS_TYPES.map(t => {
              const selected = ibsType === t.id;
              const expanded = expandedType === t.id;
              return (
                <div key={t.id} className={`rounded-2xl border overflow-hidden transition-all ${selected ? "border-brand-green ring-1 ring-brand-green/30" : "border-stone-200"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setIbsType(t.id);
                      setExpandedType(expanded ? null : t.id);
                    }}
                    className={`w-full flex items-start gap-3 p-4 text-left ${selected ? "bg-emerald-50" : "bg-white hover:bg-stone-50"}`}
                  >
                    <span className="w-9 h-9 rounded-xl bg-brand-green-light text-brand-green-dark text-sm font-bold flex items-center justify-center shrink-0">{t.badge}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 text-sm">{t.shortLabel}</p>
                      <p className="text-xs text-stone-600 mt-0.5">{t.summary}</p>
                    </div>
                    <span className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${selected ? "border-brand-green bg-brand-green" : "border-stone-300"}`}>
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </button>
                  {(expanded || selected) && (
                    <div className="px-4 pb-4 pt-0 bg-brand-green-light/50 border-t border-brand-green/20">
                      <p className="text-xs text-stone-600 mb-2">{t.clue}</p>
                      <p className="text-xs font-medium text-stone-700 mb-1">Common signs:</p>
                      <ul className="text-xs text-stone-600 space-y-0.5 list-disc pl-4">
                        {t.symptoms.map(s => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!showQuiz ? (
            <button
              type="button"
              onClick={() => setShowQuiz(true)}
              className="w-full py-3 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors"
            >
              Help me figure it out →
            </button>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 space-y-4">
              <p className="text-sm font-semibold text-stone-900">Quick symptom check</p>
              <div>
                <p className="text-xs font-medium text-stone-700 mb-2">Most days, your stools are mostly…</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "mostly_loose" as const, label: "Loose / urgent" },
                    { id: "mostly_hard" as const, label: "Hard / infrequent" },
                    { id: "both" as const, label: "Both — it varies" },
                    { id: "unsure" as const, label: "Not sure" },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuiz(q => ({ ...q, bowelPattern: opt.id }))}
                      className={`p-2.5 rounded-xl text-xs font-medium border ${quiz.bowelPattern === opt.id ? "border-brand-green bg-brand-green-light text-emerald-800" : "border-stone-200 bg-white"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-700 mb-2">Your biggest bother lately…</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "urgency" as const, label: "Urgent bathroom" },
                    { id: "bloating" as const, label: "Bloating" },
                    { id: "pain" as const, label: "Pain / cramping" },
                    { id: "unsure" as const, label: "Hard to say" },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuiz(q => ({ ...q, mainComplaint: opt.id }))}
                      className={`p-2.5 rounded-xl text-xs font-medium border ${quiz.mainComplaint === opt.id ? "border-brand-green bg-brand-green-light text-emerald-800" : "border-stone-200 bg-white"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={applyQuizSuggestion} className="btn-primary w-full text-sm py-2.5">
                Use suggested type: {suggestIbsTypeFromQuiz(quiz).replace("IBS-", "")}
              </button>
            </div>
          )}

          {selectedIbs && (
            <p className="text-xs text-stone-500 text-center">
              Selected: <strong className="text-stone-700">{selectedIbs.label}</strong>
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              persistProfile({ ibsType });
              next();
            }}
            disabled={!ibsType}
            className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-900">Allergies & diet</h1>
            <p className="text-stone-600 mt-1 text-sm">Optional — tap any that apply. Skip if none.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Food allergies</p>
            <div className="flex flex-wrap gap-2">
              {ALLERGIES.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggle(allergies, a, setAllergies)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${allergies.includes(a) ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-white text-stone-600 border border-stone-200"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Diet preference</p>
            <div className="flex flex-wrap gap-2">
              {DIETS.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggle(diets, d, setDiets)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${diets.includes(d) ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-white text-stone-600 border border-stone-200"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              persistProfile({ allergies, diets });
              next();
            }}
            className="btn-primary w-full"
          >
            Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-900">Your kitchen</h1>
            <p className="text-stone-600 mt-1 text-sm">So we don&apos;t suggest a feast for one when you cook for four.</p>
          </div>
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">People you cook for</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setHousehold(n)}
                  className={`p-3 rounded-xl border text-center font-semibold transition-all ${household === n ? "border-brand-green bg-brand-green-light text-emerald-700" : "border-stone-200 bg-white"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Cooking comfort</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "beginner", label: "Beginner", desc: "Simple, quick recipes" },
                { id: "intermediate", label: "Intermediate", desc: "Comfortable in the kitchen" },
                { id: "advanced", label: "Advanced", desc: "Happy to try new dishes" },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSkill(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${skill === s.id ? "border-brand-green bg-brand-green-light" : "border-stone-200 bg-white"}`}
                >
                  <p className="font-medium text-stone-900 capitalize">{s.label}</p>
                  <p className="text-xs text-stone-500">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              persistProfile({ skill, household });
              next();
            }}
            disabled={!skill}
            className="btn-primary w-full disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 5 && (
        <div className="text-center py-4 space-y-5">
          <div className="w-16 h-16 bg-brand-green-light rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-brand-green-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">You&apos;re all set!</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {country ? COUNTRIES.find(c => c.code === country)?.name : ""} foods
              {ibsType && (
                <>
                  {" "}
                  · {IBS_TYPES.find(t => t.id === ibsType)?.shortLabel ?? ibsType}
                </>
              )}
            </p>
          </div>
          <HintCard variant="tip">
            <p>
              <strong>Tip:</strong> Log symptoms daily for 7 days — your FODMAP fingerprint gets much sharper.
            </p>
          </HintCard>
          <a href="/dashboard" className="btn-primary w-full block text-center">
            Open my dashboard
          </a>
          <a href="/plan" className="block text-sm text-emerald-700 font-medium hover:underline">
            Or jump straight to today&apos;s meal plan →
          </a>
        </div>
      )}
    </OnboardingShell>
  );
}
