type Fodmap = "safe" | "moderate" | "high" | string;

const styles: Record<string, string> = {
  safe: "badge-safe",
  moderate: "badge-moderate",
  high: "badge-high",
};

export default function FodmapBadge({ level }: { level: Fodmap }) {
  const cls = styles[level] ?? "bg-stone-100 text-stone-600";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {level}
    </span>
  );
}
