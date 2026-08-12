export interface SymptomEntryLike {
  createdAt: string;
  severity: number;
}

export function localKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function computeStreak(entries: { createdAt: string }[]): number {
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

export function getLast7DaysSeverity(
  entries: SymptomEntryLike[]
): { label: string; level: number; isToday: boolean }[] {
  const today = new Date();
  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = localKey(d);
    const dayEntries = entries.filter(e => localKey(new Date(e.createdAt)) === key);
    const level =
      dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + e.severity, 0) / dayEntries.length
        : 0;
    result.push({ label: labels[d.getDay()], level, isToday: i === 0 });
  }
  return result;
}

export function getWeekComparison(entries: SymptomEntryLike[]): string | null {
  const today = new Date();

  function avgSeverity(startDaysAgo: number, endDaysAgo: number): number | null {
    const severities: number[] = [];
    for (let i = startDaysAgo; i < endDaysAgo; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = localKey(d);
      const dayEntries = entries.filter(e => localKey(new Date(e.createdAt)) === key);
      if (dayEntries.length > 0) {
        severities.push(dayEntries.reduce((s, e) => s + e.severity, 0) / dayEntries.length);
      }
    }
    if (severities.length === 0) return null;
    return severities.reduce((a, b) => a + b, 0) / severities.length;
  }

  const thisWeek = avgSeverity(0, 7);
  const lastWeek = avgSeverity(7, 14);
  if (thisWeek === null || lastWeek === null) return null;
  const pctChange = Math.round(((lastWeek - thisWeek) / lastWeek) * 100);
  if (pctChange > 0) return `↓ ${pctChange}% better than last week`;
  if (pctChange < 0) return `↑ ${Math.abs(pctChange)}% worse than last week`;
  return "About the same as last week";
}

export function isLoggedToday(entries: { createdAt: string }[]): boolean {
  const key = localKey(new Date());
  return entries.some(e => localKey(new Date(e.createdAt)) === key);
}
