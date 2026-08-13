function labelForPercent(pct: number): { text: string; className: string } {
  if (pct >= 80) return { text: "High safe", className: "bg-brand-green-light text-brand-green-dark" };
  if (pct >= 50) return { text: "Mod safe", className: "bg-amber-100 text-amber-800" };
  return { text: "Low safe", className: "bg-red-50 text-red-700" };
}

export default function MealSafetyPill({ percent }: { percent: number }) {
  const { text, className } = labelForPercent(percent);
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${className}`}>
      {text}
    </span>
  );
}
