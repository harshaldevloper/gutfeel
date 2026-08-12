import { analyzeFingerprint, type FingerprintResult } from "./fingerprint";
import { FOODS } from "./localizedFoods";

export interface SymptomEntry {
  id: string;
  createdAt: string;
  severity: number;
  symptoms: string[];
  bowel: string;
  stress: number;
  foods: string[];
}

const STORAGE_KEY = "gutfeel.symptoms.v1";

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
  const next: SymptomEntry = {
    ...entry,
    id: `${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [next, ...entries];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

function localKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function computeStreak(entries: SymptomEntry[]): number {
  if (entries.length === 0) return 0;
  const seen = new Set<string>();
  for (const e of entries) {
    seen.add(localKey(new Date(e.createdAt)));
  }
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (seen.has(localKey(d))) streak++;
    else if (i === 0) continue;
    else break;
  }
  return streak;
}

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