import { analyzeFingerprint, type FingerprintResult } from "@gutvista/core/fingerprint";
import { FOODS } from "@gutvista/core/foods";
import {
  localKey,
  computeStreak,
  getLast7DaysSeverity,
  getWeekComparison,
  isLoggedToday,
} from "@gutvista/core/stats";

export interface SymptomEntry {
  id: string;
  createdAt: string;
  severity: number;
  symptoms: string[];
  bowel: string;
  stress: number;
  foods: string[];
}

const STORAGE_KEY = "gutvista.symptoms.v1";

function safeParse(raw: string | null): SymptomEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function loadEntries(): Promise<SymptomEntry[]> {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export async function saveEntry(
  entry: Omit<SymptomEntry, "id" | "createdAt">
): Promise<SymptomEntry[]> {
  const entries = await loadEntries();
  const todayKey = localKey(new Date());
  const existingIdx = entries.findIndex(e => localKey(new Date(e.createdAt)) === todayKey);

  const next: SymptomEntry = {
    ...entry,
    id: existingIdx >= 0 ? entries[existingIdx].id : `${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    createdAt: existingIdx >= 0 ? entries[existingIdx].createdAt : new Date().toISOString(),
  };

  const updated =
    existingIdx >= 0
      ? entries.map((e, i) => (i === existingIdx ? next : e))
      : [next, ...entries];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export { getLast7DaysSeverity, getWeekComparison, isLoggedToday };

export interface DbStats {
  entries: SymptomEntry[];
  streak: number;
  fingerprint: FingerprintResult[];
  triggeredFoods: string[];
  testedCount: number;
}

export async function getDbStats(): Promise<DbStats> {
  const entries = await loadEntries();
  const foods = FOODS.map(f => ({ name: f.name, category: f.category }));
  const fingerprint = analyzeFingerprint(
    entries.map(e => ({
      severity: e.severity,
      foods: e.foods,
      symptoms: e.symptoms,
      created_at: e.createdAt,
    })),
    foods
  );
  const triggeredFoods = fingerprint
    .filter(f => f.status === "confirmed-trigger" || f.status === "likely-trigger")
    .map(f => f.foodName);
  const testedCount = fingerprint.filter(f => f.testCount > 0).length;
  return {
    entries,
    streak: computeStreak(entries),
    fingerprint,
    triggeredFoods,
    testedCount,
  };
}

const PROFILE_KEY = "gutvista.profile.v1";

export interface UserProfile {
  country: string;
  ibsType: string;
  allergies: string[];
  diets: string[];
  skill: string;
  household: number;
}

export async function loadProfile(): Promise<UserProfile | null> {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  if (profile.country) {
    window.localStorage.setItem("gutvista.country", profile.country);
  }
}

export function getTodayEntry(entries: SymptomEntry[]): SymptomEntry | undefined {
  const key = localKey(new Date());
  return entries.find(e => localKey(new Date(e.createdAt)) === key);
}